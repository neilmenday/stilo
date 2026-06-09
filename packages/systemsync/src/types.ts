// ─── Adapter interface ────────────────────────────────────────────────────────

export interface TokenStructure {
  categories: TokenCategory[];
}

export interface TokenCategory {
  name: string;
  type: 'color' | 'float' | 'string';
  tokens: string[];
}

export interface HierarchyLevel {
  name: string;
  dirKey: string;
  figmaPageKey: string;
  composedFrom: string | null; // name of the level below, null for Foundations
}

export interface PropPatterns {
  variantPropNames: string[];   // e.g. ['variant', 'type', 'kind']
  statePropNames: string[];     // e.g. ['state', 'status', 'isDisabled']
  stateValues: string[];        // e.g. ['Default', 'Hover', 'Focus', 'Disabled']
}

export interface Conventions {
  componentFilePattern: string;   // e.g. '{ComponentName}.tsx'
  storyFilePattern: string;       // e.g. '{ComponentName}.stories.tsx'
  indexFilePattern: string;       // e.g. 'index.ts'
  namingConvention: 'PascalCase'; // always PascalCase for components
}

export interface SystemSyncAdapter {
  name: string;
  version: string;
  getTokenStructure(): TokenStructure;
  getHierarchy(): HierarchyLevel[];
  getPropPatterns(): PropPatterns;
  getConventions(): Conventions;
}

// ─── Config ───────────────────────────────────────────────────────────────────

export interface SystemSyncConfig {
  extension: {
    name: string;
    source: string;
    componentsDir: string;
    componentSetsDir: string;
    workflowsDir: string;
    styleTilesDir: string;
    viewsDir: string;
    tokensFile: string;
  };
  figma: {
    fileKey: string;
  };
  pages: {
    foundations: string;
    passive: string;
    componentSets: string;
    workflows: string;
    styleTiles: string;
    views: string;
  };
}

// ─── Mapping ──────────────────────────────────────────────────────────────────

export interface FigmaMapping {
  fileKey: string;
  source: string;
  generatedAt: string;
  components: Record<string, MappedComponent>;
  compositions: Record<string, MappedComposition>;
}

export interface MappedComponent {
  nodeId: string;
  page: string;
  variants: string[];
  states: string[];
}

export interface MappedComposition {
  name: string;
  nodeId: string;
  page: string;
  level: 'componentSet' | 'workflow' | 'styleTile' | 'view';
  children: string[];
  layout: 'horizontal' | 'vertical';
  spacing: number;
  scaffoldGeneratedAt: string;
}

// ─── Component metadata ───────────────────────────────────────────────────────

export interface ComponentMeta {
  name: string;
  filePath: string;
  variants: string[];
  states: string[];
  props: PropMeta[];
  description: string;
}

export interface PropMeta {
  name: string;
  type: string;
  values: string[];
  required: boolean;
}

// ─── Figma nodes ──────────────────────────────────────────────────────────────

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  fills?: unknown[];
  cornerRadius?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  itemSpacing?: number;
  layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'NONE';
  style?: Record<string, unknown>;
  boundVariables?: Record<string, unknown>;
  componentId?: string;
}
