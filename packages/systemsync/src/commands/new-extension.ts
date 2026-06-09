import chalk from 'chalk';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { getAdapter } from '../adapters';
import { scaffoldExtension } from '../lib/scaffold';
import { ghIsAuthenticated, createRepo, initAndPush } from '../lib/github-api';
import { SystemSyncConfig } from '../types';

interface NewExtensionOptions {
  name: string;
  source: string;
  github: string;  // e.g. "acme-corp/acmeui"
  dir?: string;    // local output directory, defaults to ~/{repoName}
}

export async function newExtension(opts: NewExtensionOptions) {
  console.log(chalk.bold('\n systemsync new-extension\n'));

  // Validate adapter
  const adapter = getAdapter(opts.source);
  console.log(chalk.green(`  ✓ Adapter: ${adapter.name} v${adapter.version}`));

  // Validate GitHub auth
  if (!ghIsAuthenticated()) {
    console.error(chalk.red(
      '\n  Error: GitHub CLI is not authenticated.\n' +
      '  Run: gh auth login\n'
    ));
    process.exit(1);
  }
  console.log(chalk.green('  ✓ GitHub CLI authenticated'));

  // Determine local directory
  const repoName   = opts.github.split('/')[1];
  const targetDir  = path.resolve(opts.dir ?? path.join(os.homedir(), repoName));

  if (fs.existsSync(targetDir)) {
    console.error(chalk.red(`\n  Error: Directory already exists: ${targetDir}\n`));
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });
  console.log(chalk.dim(`  Creating extension at ${targetDir}`));

  // Build config
  const config: SystemSyncConfig = {
    extension: {
      name:             opts.name,
      source:           opts.source,
      componentsDir:    './src/components',
      componentSetsDir: './src/component-sets',
      workflowsDir:     './src/workflows',
      styleTilesDir:    './src/style-tiles',
      viewsDir:         './src/views',
      tokensFile:       './src/theme/tokens.ts',
    },
    figma: { fileKey: '' },
    pages: {
      foundations:   '🧱 Foundations',
      passive:       '⚙️ Passive Components',
      componentSets: '🧩 Component Sets',
      workflows:     '⚡ Workflows',
      styleTiles:    '🪟 Style Tiles',
      views:         '📐 Views',
    },
  };

  // Scaffold files
  console.log(chalk.dim('  Scaffolding extension...'));
  scaffoldExtension(targetDir, config, adapter);
  console.log(chalk.green('  ✓ Files scaffolded'));

  // Install dependencies
  console.log(chalk.dim('  Installing dependencies...'));
  execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
  console.log(chalk.green('  ✓ Dependencies installed'));

  // Create GitHub repo
  console.log(chalk.dim(`  Creating GitHub repo: ${opts.github}`));
  createRepo(opts.github, `${opts.name} — UI extension built on ${opts.source}`);
  console.log(chalk.green(`  ✓ Repo created: github.com/${opts.github}`));

  // Initial commit and push
  const account = opts.github.split('/')[0];
  console.log(chalk.dim('  Pushing to GitHub...'));
  initAndPush(targetDir, opts.github, account);
  console.log(chalk.green('  ✓ Pushed to GitHub'));

  console.log(chalk.bold(`
  Done. ${opts.name} is ready.

  Next steps:
    cd ${repoName}
    cp .env.example .env
    # Add your FIGMA_TOKEN to .env
    systemsync generate
    npm run storybook
`));
}
