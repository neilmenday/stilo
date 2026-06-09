import chalk from 'chalk';
import path from 'path';
import { SystemSyncConfig, FigmaMapping, ComponentMeta } from '../types';
import { getAdapter } from '../adapters';
import { parseComponentsDir } from '../lib/parser';
import { readMapping, writeMapping, initMapping, isComponentMapped } from '../lib/mapper';
import { figma, sleep } from '../lib/figma-api';

const BATCH_SIZE   = 10;
const BATCH_PAUSE  = 600;

export async function generate(config: SystemSyncConfig, extensionRoot: string) {
  console.log(chalk.bold('\n systemsync generate\n'));

  const adapter    = getAdapter(config.extension.source);
  const patterns   = adapter.getPropPatterns();
  const { fileKey } = config.figma;

  if (!fileKey) {
    console.error(chalk.red(
      '  Error: figma.fileKey is not set in systemsync.config.json.\n' +
      '  Create a Figma file and add its key to the config first.\n'
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

  // Verify Figma file is accessible
  console.log(chalk.dim('\nVerifying Figma file access...'));
  try {
    const file = await figma.getFile(fileKey) as { name: string };
    console.log(chalk.green(`  ✓ Figma file: ${file.name}`));
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
        const nodeId = await createComponentShell(component, config, fileKey);
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

    if (b < batches.length - 1) {
      console.log(chalk.dim(`  Pausing ${BATCH_PAUSE}ms...`));
      await sleep(BATCH_PAUSE);
    }
  }

  console.log(chalk.bold(`\n  Done. Created: ${created}  Failed: ${failed}\n`));
  console.log(chalk.dim(`  Mapping written to systemsync.figma.json\n`));
}

async function createComponentShell(
  component: ComponentMeta,
  config: SystemSyncConfig,
  fileKey: string
): Promise<string> {
  // Fetch the file to get the passive page ID
  const file = await figma.getFile(fileKey) as {
    document: { children: Array<{ id: string; name: string }> }
  };
  const passivePage = file.document.children.find(
    p => p.name === config.pages.passive
  );
  if (!passivePage) {
    throw new Error(`Page "${config.pages.passive}" not found in Figma file`);
  }
  // Return page-scoped placeholder ID
  // Actual node creation happens via Figma plugin API / MCP
  return `${passivePage.id}::${component.name}`;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}
