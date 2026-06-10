import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { SystemSyncConfig } from '../types';
import { figma } from '../lib/figma-api';
import {
  resolveSourceRoot,
  parseSourceComponents,
  parseSourceTokenValues,
  SourceComponentSpec,
  SourceTokenValues,
} from '../lib/source-parser';

export const BOOTSTRAP_FILE = 'systemsync.figma-bootstrap.json';

export interface BootstrapSpec {
  fileKey:       string;
  extensionName: string;
  status:        'pending' | 'applied';
  pages:         Record<string, string>;
  foundations: {
    spacing: SourceTokenValues['spacing'];
    radius:  SourceTokenValues['radius'];
  };
  skinless: {
    background: string;
    border:     string;
    mutedText:  string;
  };
  components:       SourceComponentSpec[];
  annotationPages:  string[];
  annotationText:   string;
  generatedAt:      string;
}

export async function bootstrapFigma(config: SystemSyncConfig, extensionRoot: string) {
  console.log(chalk.bold('\n systemsync bootstrap-figma\n'));

  const { fileKey } = config.figma;
  if (!fileKey) {
    console.error(chalk.red(
      '  Error: figma.fileKey is not set in systemsync.config.json.\n' +
      '  Run systemsync generate first.\n'
    ));
    process.exit(1);
  }

  // Verify the Figma file is accessible
  console.log(chalk.dim('  Verifying Figma file...'));
  try {
    const file = await figma.getFile(fileKey) as { name: string };
    console.log(chalk.green(`  ✓ ${file.name} (${fileKey})`));
  } catch (err) {
    console.error(chalk.red(`  Error: ${(err as Error).message}`));
    process.exit(1);
  }

  // Resolve source skeleton
  console.log(chalk.dim('\n  Resolving source skeleton...'));
  let sourceRoot: string;
  try {
    sourceRoot = resolveSourceRoot(extensionRoot, config.extension.source);
    console.log(chalk.green(`  ✓ @neilmenday/${config.extension.source}`));
  } catch (err) {
    console.error(chalk.red(`  ${(err as Error).message}`));
    process.exit(1);
  }

  // Parse token values from source
  console.log(chalk.dim('  Reading token values...'));
  const tokens = parseSourceTokenValues(sourceRoot);
  console.log(chalk.green(
    `  ✓ ${tokens.spacing.length} spacing · ${tokens.radius.length} radius`
  ));

  // Parse source components
  console.log(chalk.dim('  Parsing source components...'));
  const components = parseSourceComponents(sourceRoot);
  console.log(chalk.green(`  ✓ ${components.length} components`));

  // Identify which pages get annotations vs full content
  const contentPages  = new Set(['foundations', 'passive']);
  const annotationPages = Object.keys(config.pages).filter(k => !contentPages.has(k));

  // Build spec
  const spec: BootstrapSpec = {
    fileKey,
    extensionName: config.extension.name,
    status:        'pending',
    pages:         config.pages,
    foundations: {
      spacing: tokens.spacing,
      radius:  tokens.radius,
    },
    skinless: {
      background: '#F4F6F8',
      border:     '#D8DDE6',
      mutedText:  '#9DAAB6',
    },
    components,
    annotationPages,
    annotationText: 'Populated by systemsync compose after designing in Figma',
    generatedAt:    new Date().toISOString(),
  };

  const specPath = path.join(extensionRoot, BOOTSTRAP_FILE);
  fs.writeFileSync(specPath, JSON.stringify(spec, null, 2) + '\n');

  console.log(chalk.bold('\n  Bootstrap spec written.\n'));
  console.log(
    chalk.dim('  Pages:          ') + Object.values(config.pages).join(', ')
  );
  console.log(
    chalk.dim('  Components:     ') + components.length
  );
  console.log(
    chalk.dim('  Spacing tokens: ') +
    tokens.spacing.map(t => `${t.label} (${t.value}px)`).join(', ')
  );
  console.log(
    chalk.dim('  Radius tokens:  ') +
    tokens.radius.map(t => `${t.label} (${t.value}px)`).join(', ')
  );
  console.log(
    chalk.dim('  Annotation:     ') + annotationPages.length + ' pages'
  );
  console.log(chalk.dim(`\n  Spec: ${specPath}\n`));
}
