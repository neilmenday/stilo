import chalk from 'chalk';
import path from 'path';
import { SystemSyncConfig, FigmaMapping, ComponentMeta } from '../types';
import { getAdapter } from '../adapters';
import { parseComponentsDir } from '../lib/parser';
import { readMapping, writeMapping, initMapping, isComponentMapped } from '../lib/mapper';
import { figma } from '../lib/figma-api';

const BATCH_SIZE = 10;

export async function generate(config: SystemSyncConfig, extensionRoot: string) {
  console.log(chalk.bold('\n systemsync generate\n'));

  const adapter  = getAdapter(config.extension.source);
  const patterns = adapter.getPropPatterns();
  let fileKey    = config.figma.fileKey;

  if (!fileKey) {
    console.error(chalk.red(
      '  Error: figma.fileKey is not set in systemsync.config.json.\n' +
      '  When running via Claude Code, this is handled automatically via Figma MCP.\n' +
      '  Otherwise, create a Figma file and add its key to systemsync.config.json manually.\n'
    ));
    process.exit(1);
  }

  let mapping: FigmaMapping =
    readMapping(extensionRoot) ?? initMapping(fileKey, config.extension.source);

  // Parse components
  const componentsDir = path.resolve(extensionRoot, config.extension.componentsDir);
  console.log(chalk.dim(`Parsing components from ${componentsDir}...`));
  const components = parseComponentsDir(componentsDir, patterns);
  console.log(chalk.green(`  Found ${components.length} components`));

  const toProcess  = components.filter(c => !isComponentMapped(mapping, c.name));
  const alreadyDone = components.length - toProcess.length;
  if (alreadyDone > 0) console.log(chalk.dim(`  Skipping ${alreadyDone} already mapped`));

  if (toProcess.length === 0) {
    console.log(chalk.yellow('\n  All components already mapped.\n'));
    return;
  }

  // Fetch file once — resolve passive page ID up front, never again inside the loop
  console.log(chalk.dim('\nVerifying Figma file access...'));
  let passivePageId: string;
  try {
    const file = await figma.getFile(fileKey) as {
      name: string;
      document: { children: Array<{ id: string; name: string }> };
    };
    console.log(chalk.green(`  ✓ Figma file: ${file.name}`));
    const passivePage = file.document.children.find(p => p.name === config.pages.passive);
    if (!passivePage) {
      console.error(chalk.red(`  Error: Page "${config.pages.passive}" not found in Figma file.`));
      process.exit(1);
    }
    passivePageId = passivePage.id;
  } catch (err) {
    console.error(chalk.red(`  Error accessing Figma file: ${(err as Error).message}`));
    process.exit(1);
  }

  // Process in batches
  const batches = chunk(toProcess, BATCH_SIZE);
  let created = 0;
  let failed  = 0;

  console.log(chalk.dim(`\nProcessing ${toProcess.length} components in batches of ${BATCH_SIZE}...\n`));

  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b];
    console.log(chalk.dim(`Batch ${b + 1}/${batches.length}:`));

    for (const component of batch) {
      try {
        const nodeId = createComponentShell(component, passivePageId);
        mapping.components[component.name] = {
          nodeId,
          page: 'passive',
          variants: component.variants,
          states:   component.states,
        };
        console.log(chalk.green(`  ✓ ${component.name}`));
        created++;
      } catch (err) {
        console.log(chalk.red(`  ✗ ${component.name} — ${(err as Error).message}`));
        failed++;
      }
    }

    // Save after every batch — resumable on failure
    mapping.generatedAt = new Date().toISOString();
    writeMapping(extensionRoot, mapping);

  }

  console.log(chalk.bold(`\n  Done. Created: ${created}  Failed: ${failed}\n`));
  console.log(chalk.dim(`  Mapping written to systemsync.figma.json\n`));
}

function createComponentShell(component: ComponentMeta, passivePageId: string): string {
  return `${passivePageId}::${component.name}`;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

