import { Project } from 'ts-morph';
import fs from 'fs';
import path from 'path';

export interface SourceComponentSpec {
  name: string;
  variants: string[];
  states: string[];
}

export interface SourceTokenValues {
  spacing: { name: string; label: string; value: number }[];
  radius:  { name: string; label: string; value: number }[];
}

export function resolveSourceRoot(extensionRoot: string, sourceName: string): string {
  const p = path.join(extensionRoot, 'node_modules', '@neilmenday', sourceName);
  if (fs.existsSync(p)) return p;
  throw new Error(
    `Source @neilmenday/${sourceName} not found in ${path.join(extensionRoot, 'node_modules')}`
  );
}

export function parseSourceComponents(sourceRoot: string): SourceComponentSpec[] {
  const componentsDir = path.join(sourceRoot, 'src', 'components');
  if (!fs.existsSync(componentsDir)) {
    throw new Error(`Components directory not found: ${componentsDir}`);
  }

  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const results: SourceComponentSpec[] = [];

  for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const typesPath = path.join(componentsDir, entry.name, 'types.ts');
    if (!fs.existsSync(typesPath)) continue;

    project.addSourceFileAtPath(typesPath);
    const source = project.getSourceFile(typesPath);
    if (!source) continue;

    const variants: string[] = [];
    const states:   string[] = [];

    for (const alias of source.getTypeAliases()) {
      if (!alias.isExported()) continue;
      const aliasName = alias.getName();
      const values = extractUnionValues(alias.getTypeNode()?.getText() ?? '');
      if (values.length === 0) continue;

      if (/variant|kind|appearance/i.test(aliasName) && !/state|status/i.test(aliasName)) {
        for (const v of values) if (!variants.includes(v)) variants.push(v);
      } else if (/state|status/i.test(aliasName)) {
        for (const v of values) if (!states.includes(v)) states.push(v);
      }
    }

    if (states.length === 0) states.push('Default', 'Hover', 'Disabled');

    results.push({ name: entry.name, variants, states });
  }

  return results;
}

export function parseSourceTokenValues(sourceRoot: string): SourceTokenValues {
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  return {
    spacing: parseObjectTokenFile(project, path.join(sourceRoot, 'src', 'tokens', 'spacing.ts')),
    radius:  parseObjectTokenFile(project, path.join(sourceRoot, 'src', 'tokens', 'radius.ts')),
  };
}

function parseObjectTokenFile(
  project: Project,
  filePath: string
): { name: string; label: string; value: number }[] {
  if (!fs.existsSync(filePath)) return [];

  project.addSourceFileAtPath(filePath);
  const source = project.getSourceFile(filePath);
  if (!source) return [];

  const results: { name: string; label: string; value: number }[] = [];

  for (const varDecl of source.getVariableDeclarations()) {
    const init = varDecl.getInitializer();
    if (!init) continue;
    // Match "key: number" entries in an object literal
    const matches = [...init.getText().matchAll(/\b([a-zA-Z]\w*):\s*(\d+)/g)];
    for (const m of matches) {
      const name  = m[1];
      const value = parseInt(m[2], 10);
      // camelCase → kebab-case label
      const label = name.replace(/([A-Z])/g, '-$1').toLowerCase();
      results.push({ name, label, value });
    }
  }

  return results;
}

function extractUnionValues(typeText: string): string[] {
  const double = typeText.match(/"([^"]+)"/g);
  if (double) return double.map(m => m.slice(1, -1));
  const single = typeText.match(/'([^']+)'/g);
  if (single) return single.map(m => m.slice(1, -1));
  return [];
}
