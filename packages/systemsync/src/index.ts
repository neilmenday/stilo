import { Command } from 'commander';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { newExtension } from './commands/new-extension';
import { generate }     from './commands/generate';
import { compose }      from './commands/compose';
import { sync }         from './commands/sync';
import { push }         from './commands/push';
import { listAdapters } from './adapters';
import { SystemSyncConfig } from './types';

dotenv.config();

const program = new Command();

program
  .name('systemsync')
  .description('Generate and sync UI extensions from any structural design system skeleton')
  .version('0.1.0');

function loadConfig(extensionRoot: string): SystemSyncConfig {
  const jsonPath = path.join(extensionRoot, 'systemsync.config.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error(
      'No systemsync.config.json found. Run systemsync new-extension first.'
    );
  }
  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as SystemSyncConfig;
}

program
  .command('sources')
  .description('List available source adapters')
  .action(() => {
    const adapters = listAdapters();
    console.log('\n Available adapters:\n');
    for (const a of adapters) {
      console.log(`  ${a.name}  v${a.version}`);
    }
    console.log();
  });

program
  .command('new-extension')
  .description('Bootstrap a new UI extension from a structural skeleton')
  .requiredOption('--name <name>',     'Extension name, e.g. "AcmeUI"')
  .requiredOption('--source <source>', 'Source adapter, e.g. "stilo"')
  .requiredOption('--github <repo>',   'GitHub repo path, e.g. "acme-corp/acmeui"')
  .option('--dir <path>',              'Local output directory (defaults to ./<repoName>)')
  .action(async (opts) => {
    await newExtension(opts);
  });

program
  .command('generate')
  .description('Generate Figma component shells from extension component files')
  .option('-r, --root <path>', 'Extension root directory', process.cwd())
  .action(async (opts) => {
    const extensionRoot = path.resolve(opts.root);
    if (!process.env.FIGMA_TOKEN) {
      console.error('Error: FIGMA_TOKEN is not set.');
      process.exit(1);
    }
    const config = loadConfig(extensionRoot);
    await generate(config, extensionRoot);
  });

program
  .command('compose')
  .description('Read designer Figma compositions and generate code scaffolds')
  .option('-r, --root <path>', 'Extension root directory', process.cwd())
  .action(async (opts) => {
    const extensionRoot = path.resolve(opts.root);
    if (!process.env.FIGMA_TOKEN) {
      console.error('Error: FIGMA_TOKEN is not set.');
      process.exit(1);
    }
    const config = loadConfig(extensionRoot);
    await compose(config, extensionRoot);
  });

program
  .command('sync')
  .description('Sync visual values from Figma back to extension code')
  .option('-r, --root <path>', 'Extension root directory', process.cwd())
  .action(async (opts) => {
    const config = loadConfig(path.resolve(opts.root));
    await sync(config, path.resolve(opts.root));
  });

program
  .command('push')
  .description('Push composition structure changes from code back to Figma')
  .option('-r, --root <path>', 'Extension root directory', process.cwd())
  .action(async (opts) => {
    const config = loadConfig(path.resolve(opts.root));
    await push(config, path.resolve(opts.root));
  });

program.parse(process.argv);
