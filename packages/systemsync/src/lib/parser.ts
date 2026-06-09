import { Project } from 'ts-morph';
import path from 'path';
import fs from 'fs';
import { ComponentMeta, PropMeta, PropPatterns } from '../types';

export function parseComponentsDir(
  componentsDir: string,
  patterns: PropPatterns
): ComponentMeta[] {
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const results: ComponentMeta[] = [];

  if (!fs.existsSync(componentsDir)) {
    console.warn(`Components directory not found: ${componentsDir}`);
    return results;
  }

  const files = findTsxFiles(componentsDir);

  for (const filePath of files) {
    project.addSourceFileAtPath(filePath);
    const source = project.getSourceFile(filePath);
    if (!source) continue;

    const name = path.basename(filePath, '.tsx');
    if (name.includes('.stories') || name === 'index') continue;

    const props: PropMeta[] = [];
    const variants: string[] = [];
    const states: string[] = [];

    const interfaces = source.getInterfaces();
    for (const iface of interfaces) {
      if (!iface.getName().includes('Props')) continue;
      for (const member of iface.getProperties()) {
        const propName  = member.getName();
        const typeText  = member.getTypeNode()?.getText() || '';
        const required  = !member.hasQuestionToken();
        const values    = extractUnionValues(typeText);
        props.push({ name: propName, type: typeText, values, required });

        if (patterns.variantPropNames.includes(propName) && values.length > 0) {
          variants.push(...values.filter(v => !variants.includes(v)));
        }
        if (patterns.statePropNames.includes(propName) && values.length > 0) {
          states.push(...values.filter(v =>
            patterns.stateValues.includes(v) && !states.includes(v)
          ));
        }
      }
    }

    if (states.length === 0) states.push('Default', 'Hover', 'Focus');

    const description = props.length > 0
      ? `Props: ${props.map(p => `${p.name}${p.required ? '' : '?'}: ${p.type}`).join(' | ')}`
      : 'No props interface found';

    results.push({ name, filePath, variants, states, props, description });
  }

  return results;
}

function findTsxFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findTsxFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.tsx')) results.push(full);
  }
  return results;
}

function extractUnionValues(typeText: string): string[] {
  const double = typeText.match(/"([^"]+)"/g);
  if (double) return double.map(m => m.replace(/"/g, ''));
  const single = typeText.match(/'([^']+)'/g);
  if (single) return single.map(m => m.replace(/'/g, ''));
  return [];
}
