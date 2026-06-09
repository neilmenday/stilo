import fs from 'fs';
import path from 'path';
import { FigmaMapping } from '../types';

const MAPPING_FILE = 'systemsync.figma.json';

export function readMapping(extensionRoot: string): FigmaMapping | null {
  const filePath = path.join(extensionRoot, MAPPING_FILE);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as FigmaMapping;
}

export function writeMapping(extensionRoot: string, mapping: FigmaMapping): void {
  const filePath = path.join(extensionRoot, MAPPING_FILE);
  fs.writeFileSync(filePath, JSON.stringify(mapping, null, 2), 'utf-8');
}

export function initMapping(fileKey: string, source: string): FigmaMapping {
  return {
    fileKey,
    source,
    generatedAt: new Date().toISOString(),
    components: {},
    compositions: {},
  };
}

export function isComponentMapped(mapping: FigmaMapping, name: string): boolean {
  return !!mapping.components[name];
}

export function isCompositionMapped(mapping: FigmaMapping, name: string): boolean {
  return !!mapping.compositions[name];
}
