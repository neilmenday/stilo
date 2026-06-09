import { SystemSyncAdapter, TokenStructure, HierarchyLevel, PropPatterns, Conventions } from '../types';

export const StiloAdapter: SystemSyncAdapter = {
  name: 'stilo',
  version: '0.1.0',

  getTokenStructure(): TokenStructure {
    return {
      categories: [
        {
          name: 'spacing',
          type: 'float',
          tokens: [
            'web-spacing-1',
            'web-spacing-2',
            'base-spacing-1',
            'base-spacing-2',
            'tight-spacing',
            'component-inner-spacing',
          ],
        },
        {
          name: 'radius',
          type: 'float',
          tokens: [
            'corner-radius-1',
            'corner-radius-2',
            'corner-radius-3',
          ],
        },
        {
          name: 'colors',
          type: 'color',
          tokens: [], // Extension defines its own colour tokens
        },
        {
          name: 'typography',
          type: 'string',
          tokens: ['font-stack'],
        },
      ],
    };
  },

  getHierarchy(): HierarchyLevel[] {
    return [
      {
        name: 'Foundations',
        dirKey: 'foundationsDir',
        figmaPageKey: 'foundations',
        composedFrom: null,
      },
      {
        name: 'Passive Components',
        dirKey: 'componentsDir',
        figmaPageKey: 'passive',
        composedFrom: 'Foundations',
      },
      {
        name: 'Component Sets',
        dirKey: 'componentSetsDir',
        figmaPageKey: 'componentSets',
        composedFrom: 'Passive Components',
      },
      {
        name: 'Workflows',
        dirKey: 'workflowsDir',
        figmaPageKey: 'workflows',
        composedFrom: 'Component Sets',
      },
      {
        name: 'Style Tiles',
        dirKey: 'styleTilesDir',
        figmaPageKey: 'styleTiles',
        composedFrom: 'Workflows',
      },
      {
        name: 'Views',
        dirKey: 'viewsDir',
        figmaPageKey: 'views',
        composedFrom: 'Style Tiles',
      },
    ];
  },

  getPropPatterns(): PropPatterns {
    return {
      variantPropNames: ['variant', 'type', 'kind', 'size', 'appearance'],
      statePropNames:   ['state', 'status', 'isDisabled', 'isOpen', 'isFocused'],
      stateValues:      ['Default', 'Hover', 'Focus', 'Active', 'Disabled',
                         'Open', 'Closed', 'Filled', 'Error', 'Loading'],
    };
  },

  getConventions(): Conventions {
    return {
      componentFilePattern: '{ComponentName}.tsx',
      storyFilePattern:     '{ComponentName}.stories.tsx',
      indexFilePattern:     'index.ts',
      namingConvention:     'PascalCase',
    };
  },
};
