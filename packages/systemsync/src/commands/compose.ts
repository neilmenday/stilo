import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { SystemSyncConfig, FigmaMapping, FigmaNode, MappedComposition } from '../types';
import { readMapping, writeMapping, isCompositionMapped } from '../lib/mapper';
import { figma } from '../lib/figma-api';

const PAGE_LEVEL_MAP: Record<string, {
  level: MappedComposition['level'];
  dirKey: keyof SystemSyncConfig['extension'];
}> = {
  componentSets: { level: 'componentSet', dirKey: 'componentSetsDir' },
  workflows:     { level: 'workflow',     dirKey: 'workflowsDir'     },
  styleTiles:    { level: 'styleTile',    dirKey: 'styleTilesDir'    },
  views:         { level: 'view',         dirKey: 'viewsDir'         },
};

export async function compose(config: SystemSyncConfig, extensionRoot: string) {
  console.log(chalk.bold('\n systemsync compose\n'));

  const { fileKey } = config.figma;
  const mapping: FigmaMapping =
    readMapping(extensionRoot) ?? {
      fileKey, source: config.extension.source,
      generatedAt: new Date().toISOString(),
      components: {}, compositions: {},
    };

  const knownComponents = new Set(Object.keys(mapping.components));
  const componentsDir   = path.resolve(extensionRoot, config.extension.componentsDir);

  console.log(chalk.dim('Fetching Figma file...'));
  const raw = await figma.getFile(fileKey) as { document?: { children: FigmaNode[] } };

  if (!raw.document) {
    console.error(chalk.red(
      '\n  Error: Figma file returned no document tree.\n' +
      '  Your FIGMA_TOKEN needs the "file_content:read" scope.\n' +
      '  Regenerate it at figma.com → Account Settings → Personal Access Tokens.\n'
    ));
    process.exit(1);
  }

  const pages = raw.document.children;
  let created = 0;
  let skipped = 0;
  let failed  = 0;

  for (const [pageKey, { level, dirKey }] of Object.entries(PAGE_LEVEL_MAP)) {
    const pageName = config.pages[pageKey as keyof typeof config.pages];
    const page     = pages.find(p => p.name === pageName);

    if (!page?.children?.length) {
      console.log(chalk.dim(`  (skipping "${pageName}" — page not found or empty)`));
      continue;
    }

    console.log(chalk.dim(`\nScanning: ${pageName}`));
    const outputDir = path.resolve(extensionRoot, config.extension[dirKey] as string);
    fs.mkdirSync(outputDir, { recursive: true });

    for (const frame of page.children) {
      if (frame.type !== 'FRAME' && frame.type !== 'COMPONENT_SET') continue;

      const name = sanitiseName(frame.name);
      if (!name) continue;

      if (isCompositionMapped(mapping, name)) {
        skipped++;
        continue;
      }

      try {
        const children = findInstances(frame, knownComponents);
        const layout   = frame.layoutMode === 'HORIZONTAL' ? 'horizontal' : 'vertical';
        const spacing  = frame.itemSpacing ?? 0;

        generateScaffold({ name, level, children, layout, spacing, outputDir, componentsDir });

        mapping.compositions[name] = {
          name, nodeId: frame.id, page: pageKey, level,
          children, layout, spacing,
          scaffoldGeneratedAt: new Date().toISOString(),
        };

        const childLabel = children.length ? `[${children.join(', ')}]` : '(no component children)';
        console.log(chalk.green(`  ✓ ${name} ${childLabel}`));
        created++;
      } catch (err) {
        console.log(chalk.red(`  ✗ ${frame.name} — ${(err as Error).message}`));
        failed++;
      }
    }
  }

  writeMapping(extensionRoot, mapping);
  console.log(chalk.bold(
    `\n  Done. Created: ${created}  Skipped: ${skipped}  Failed: ${failed}\n`
  ));
}

function findInstances(node: FigmaNode, known: Set<string>): string[] {
  const found: string[] = [];
  if (!node.children) return found;
  for (const child of node.children) {
    if (child.type === 'INSTANCE') {
      const name = sanitiseName(child.name);
      if (known.has(name) && !found.includes(name)) found.push(name);
    }
    if (child.children) {
      for (const n of findInstances(child, known)) {
        if (!found.includes(n)) found.push(n);
      }
    }
  }
  return found;
}

function sanitiseName(name: string): string {
  return name
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function generateScaffold(opts: {
  name: string;
  level: MappedComposition['level'];
  children: string[];
  layout: 'horizontal' | 'vertical';
  spacing: number;
  outputDir: string;
  componentsDir: string;
}) {
  const { name, level, children, layout, spacing, outputDir, componentsDir } = opts;

  const importBase = path.relative(outputDir, componentsDir).replace(/\\/g, '/');

  const imports = children.map(c =>
    `import { ${c} } from '${importBase}/${c}';`
  ).join('\n');

  const propLines = children.map(c =>
    `  ${lcFirst(c)}: React.ComponentProps<typeof ${c}>;`
  ).join('\n');

  const jsxChildren = children.map(c =>
    `      <${c} {...${lcFirst(c)}} />`
  ).join('\n');

  const flexDirection = layout === 'horizontal' ? 'row' : 'column';
  const childParams   = children.length
    ? `{ ${children.map(lcFirst).join(', ')}, className }`
    : '{ className }';

  const content = `import React from 'react';
${imports ? imports + '\n' : ''}
export const ${name}Structure = {
  level:    '${level}',
  children: ${JSON.stringify(children)},
  layout:   '${layout}',
  spacing:  ${spacing},
} as const;

export interface ${name}Props {
${propLines ? propLines + '\n' : ''}  className?: string;
}

export function ${name}(${childParams}: ${name}Props) {
  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: '${flexDirection}', gap: ${spacing} }}
    >
${jsxChildren}
    </div>
  );
}

export default ${name};
`;

  fs.writeFileSync(path.join(outputDir, `${name}.tsx`), content, 'utf-8');
}

const lcFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
