import { Project } from 'ts-morph';
import fs from 'fs';
import path from 'path';

export type AnatomySlotType =
  | 'text' | 'icon' | 'control' | 'radio' | 'toggle' | 'circle' | 'input'
  | 'textarea' | 'dropdown' | 'image' | 'divider' | 'dots' | 'area'
  | 'row' | 'table' | 'calendar' | 'chart' | 'header-bar' | 'footer-bar'
  | 'sidebar' | 'breadcrumb' | 'tabs' | 'steps' | 'pills-row' | 'card-grid';

export interface AnatomySlot {
  type: AnatomySlotType;
  label?: string;
  w?: number;
  h?: number;
}

export interface ComponentAnatomy {
  layout: 'h' | 'v' | 'free';
  w: number;
  h: number;
  padding: number;
  gap: number;
  slots: AnatomySlot[];
}

export interface SourceComponentSpec {
  name: string;
  variants: string[];
  states: string[];
  anatomy: ComponentAnatomy;
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

function extractPropsFromInterface(typesPath: string): string[] {
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  project.addSourceFileAtPath(typesPath);
  const source = project.getSourceFile(typesPath);
  if (!source) return [];
  const props: string[] = [];
  for (const iface of source.getInterfaces()) {
    if (!iface.isExported()) continue;
    if (!iface.getName().endsWith('Props')) continue;
    for (const prop of iface.getProperties()) {
      props.push(prop.getName());
    }
  }
  return props;
}

// Anatomy overrides for components whose structure can't be inferred from prop names alone
const ANATOMY_OVERRIDES: Record<string, ComponentAnatomy> = {
  Calendar:              { layout: 'v', w: 420, h: 264, padding: 8, gap: 0, slots: [{type:'calendar'}] },
  CalendarView:          { layout: 'free', w: 760, h: 440, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'calendar'}] },
  ControllableCalendarSet:{ layout: 'free', w: 700, h: 400, padding: 0, gap: 0, slots: [{type:'calendar'},{type:'area',label:'panel'}] },
  Table:                 { layout: 'v', w: 520, h: 196, padding: 0, gap: 0, slots: [{type:'table'}] },
  TableSet:              { layout: 'v', w: 520, h: 196, padding: 0, gap: 0, slots: [{type:'table'},{type:'area',label:'panel'}] },
  InfoListSet:           { layout: 'v', w: 480, h: 188, padding: 0, gap: 0, slots: [{type:'table'}] },
  ListView:              { layout: 'free', w: 760, h: 440, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'row',label:'list'}] },
  ListViewWithTabs:      { layout: 'free', w: 760, h: 440, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'tabs'},{type:'row',label:'list'}] },
  GridView:              { layout: 'free', w: 760, h: 440, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'card-grid'}] },
  CalendarView2:         { layout: 'free', w: 760, h: 440, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'calendar'}] },
  SettingsView:          { layout: 'free', w: 760, h: 440, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'area',label:'settings'}] },
  SettingsViewWithTabs:  { layout: 'free', w: 760, h: 440, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'tabs'},{type:'area',label:'settings'}] },
  MiscView:              { layout: 'free', w: 760, h: 360, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'tabs'},{type:'area'}] },
  FShapeLayout:          { layout: 'free', w: 480, h: 320, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'area'}] },
  HShapeLayout:          { layout: 'free', w: 680, h: 360, padding: 0, gap: 0, slots: [{type:'sidebar'},{type:'header-bar'},{type:'area'}] },
  DataViz:               { layout: 'v', w: 360, h: 200, padding: 0, gap: 0, slots: [{type:'text',label:'title'},{type:'chart'}] },
  AppSidebar:            { layout: 'v', w: 200, h: 320, padding: 0, gap: 0, slots: [{type:'sidebar'}] },
  SalesforceHeader:      { layout: 'h', w: 600, h: 56, padding: 16, gap: 12, slots: [{type:'text',label:'AppName'},{type:'input',label:'search',w:240},{type:'text',label:'Nav'},{type:'circle',w:32,h:32}] },
  SalesforceNav:         { layout: 'h', w: 480, h: 48, padding: 16, gap: 16, slots: [{type:'text',label:'AppName'},{type:'tabs'}] },
  Drawer:                { layout: 'v', w: 320, h: 360, padding: 0, gap: 0, slots: [{type:'header-bar'},{type:'area'},{type:'footer-bar'}] },
  DrawerPanel:           { layout: 'v', w: 280, h: 320, padding: 0, gap: 0, slots: [{type:'header-bar'},{type:'area'},{type:'footer-bar'}] },
  Overlay:               { layout: 'v', w: 400, h: 320, padding: 0, gap: 0, slots: [{type:'header-bar'},{type:'area'},{type:'footer-bar'}] },
  Workflows:             { layout: 'free', w: 640, h: 400, padding: 0, gap: 0, slots: [{type:'header-bar'},{type:'area',label:'left'},{type:'area',label:'right'},{type:'footer-bar'}] },
  ControllableListSet:   { layout: 'free', w: 760, h: 440, padding: 0, gap: 0, slots: [{type:'row',label:'list'},{type:'area',label:'panel'}] },
  ControllableTableSet:  { layout: 'free', w: 760, h: 340, padding: 0, gap: 0, slots: [{type:'table'},{type:'area',label:'panel'}] },
  ControllableGridSet:   { layout: 'free', w: 680, h: 360, padding: 0, gap: 0, slots: [{type:'card-grid'},{type:'area',label:'panel'}] },
  StepIndicator:         { layout: 'h', w: 200, h: 48, padding: 0, gap: 0, slots: [{type:'steps'}] },
  Breadcrumb:            { layout: 'h', w: 220, h: 20, padding: 0, gap: 4, slots: [{type:'breadcrumb'}] },
  Tab:                   { layout: 'h', w: 200, h: 32, padding: 0, gap: 0, slots: [{type:'tabs'}] },
  FilterResultsBar:      { layout: 'h', w: 240, h: 24, padding: 0, gap: 8, slots: [{type:'pills-row'}] },
  ConditionBuilder:      { layout: 'v', w: 400, h: 120, padding: 0, gap: 8, slots: [{type:'text',label:'Conditions'},{type:'row',label:'field | condition | value × | add'},{type:'row'}] },
  MRF:                   { layout: 'v', w: 420, h: 120, padding: 0, gap: 8, slots: [{type:'text',label:'Rules'},{type:'row',label:'field | field2 | condition | value ×'},{type:'row'}] },
  MappingSet:            { layout: 'v', w: 300, h: 110, padding: 0, gap: 4, slots: [{type:'row',label:'Source | Target'},{type:'row'},{type:'row'}] },
  ActionsSet:            { layout: 'h', w: 360, h: 36, padding: 0, gap: 8, slots: [{type:'dropdown',label:'filter',w:140},{type:'input',label:'search',w:120},{type:'area',label:'button',w:80}] },
  FunctionsBar:          { layout: 'h', w: 240, h: 48, padding: 8, gap: 8, slots: [{type:'area',label:'Cancel',w:80},{type:'area',label:'Save',w:80}] },
  ModeSpace:             { layout: 'h', w: 360, h: 48, padding: 8, gap: 8, slots: [{type:'text',label:'message'},{type:'area',label:'Cancel',w:80},{type:'area',label:'Save',w:80}] },
  HeaderBlock:           { layout: 'h', w: 440, h: 52, padding: 16, gap: 12, slots: [{type:'text',label:'title'},{type:'dropdown',label:'chooser'},{type:'area',label:'action',w:96}] },
  TitleBlock:            { layout: 'h', w: 400, h: 48, padding: 0, gap: 12, slots: [{type:'text',label:'Page Title'},{type:'icon',label:'help'},{type:'area',label:'Action',w:112}] },
  InfoListItem:          { layout: 'h', w: 480, h: 44, padding: 0, gap: 0, slots: [{type:'circle',w:32,h:32,label:'avatar'},{type:'text',label:'identifier'},{type:'text',label:'supporting'},{type:'area',label:'status',w:64},{type:'dots'}] },
  ListItemGroup:         { layout: 'v', w: 200, h: 120, padding: 0, gap: 4, slots: [{type:'row',label:'handle | colour | label'},{type:'row'},{type:'row'}] },
  FormBlockSettings:     { layout: 'v', w: 400, h: 200, padding: 0, gap: 0, slots: [{type:'text',label:'Settings section'},{type:'divider'},{type:'row',label:'label | description | field'},{type:'row'},{type:'row'}] },
  FormBlockExpandable:   { layout: 'v', w: 320, h: 120, padding: 0, gap: 0, slots: [{type:'header-bar'},{type:'area'}] },
  FormBlockInput:        { layout: 'v', w: 280, h: 160, padding: 12, gap: 8, slots: [{type:'input',label:'label'},{type:'textarea',label:'text area'}] },
  WorkflowManaged:       { layout: 'v', w: 200, h: 80, padding: 16, gap: 0, slots: [{type:'text',label:'Context provider'}] },
  TerritoryCard:         { layout: 'v', w: 240, h: 160, padding: 0, gap: 0, slots: [{type:'image',label:'map',h:100},{type:'area',label:'title | status | dot-menu'}] },
  ExpandableBox:         { layout: 'v', w: 280, h: 80, padding: 0, gap: 0, slots: [{type:'header-bar'},{type:'area',label:'content'}] },
  Box:                   { layout: 'v', w: 280, h: 160, padding: 0, gap: 0, slots: [{type:'header-bar'},{type:'area',label:'content'}] },
  PillColorPicker:       { layout: 'h', w: 100, h: 24, padding: 0, gap: 8, slots: [{type:'area',label:'Colour',w:74},{type:'circle',w:16,h:16,label:'swatch'}] },
  Popover:               { layout: 'v', w: 200, h: 100, padding: 12, gap: 4, slots: [{type:'text',label:'title'},{type:'text',label:'body text'},{type:'area',label:'caret',h:12}] },
  Toast:                 { layout: 'h', w: 320, h: 48, padding: 12, gap: 8, slots: [{type:'icon',label:'icon'},{type:'text',label:'message'},{type:'icon',label:'dismiss'}] },
  ScopedNotification:    { layout: 'h', w: 300, h: 40, padding: 12, gap: 8, slots: [{type:'icon',label:'icon'},{type:'text',label:'label'}] },
  UnsavedChangesGuard:   { layout: 'h', w: 360, h: 48, padding: 12, gap: 8, slots: [{type:'icon',label:'!'},{type:'text',label:'Unsaved changes'},{type:'area',label:'Discard',w:84},{type:'area',label:'Save now',w:84}] },
  DotMenu:               { layout: 'v', w: 24, h: 40, padding: 8, gap: 0, slots: [{type:'dots'}] },
  InfoPopover:           { layout: 'free', w: 24, h: 24, padding: 0, gap: 0, slots: [{type:'circle',w:24,h:24,label:'i'}] },
  Icon:                  { layout: 'free', w: 36, h: 36, padding: 0, gap: 0, slots: [{type:'circle',w:24,h:24,label:'icon'}] },
};

function deriveAnatomy(componentName: string, props: string[]): ComponentAnatomy {
  if (ANATOMY_OVERRIDES[componentName]) return ANATOMY_OVERRIDES[componentName];

  const p = new Set(props);
  const slots: AnatomySlot[] = [];
  let layout: ComponentAnatomy['layout'] = 'h';
  let w = 180, h = 36, padding = 10, gap = 5;

  // Vertical layouts: components with label above + input below
  if ((p.has('label') || p.has('showLabel')) && (p.has('placeholder') || p.has('errorText') || p.has('helperText'))) {
    layout = 'v'; w = 200; h = 56; padding = 0; gap = 4;
    if (p.has('label')) slots.push({ type: 'text', label: 'Label', h: 14 });
    if (p.has('rows')) { slots.push({ type: 'textarea' }); h = 96; }
    else if (p.has('items')) slots.push({ type: 'dropdown' });
    else slots.push({ type: 'input' });
    if (p.has('helperText') || p.has('errorText')) slots.push({ type: 'text', label: 'Helper text', h: 14 });
    return { layout, w, h, padding, gap, slots };
  }

  // Horizontal controls
  if (p.has('checked')) {
    // Checkbox or toggle
    if (p.has('onLabel') || p.has('offLabel')) {
      slots.push({ type: 'toggle' });
    } else {
      slots.push({ type: 'control' });
    }
    if (p.has('label')) slots.push({ type: 'text', label: 'Label' });
    h = 22; w = p.has('label') ? 200 : 40;
    return { layout: 'h', w, h, padding: 0, gap: 8, slots };
  }

  if (p.has('src') || p.has('initials')) {
    // Avatar-like
    slots.push({ type: 'circle', w: 36, h: 36 });
    if (p.has('name') || p.has('label')) slots.push({ type: 'text', label: p.has('name') ? 'Name' : 'Label' });
    if (p.has('status')) slots.push({ type: 'area', label: 'status', w: 64 });
    return { layout: 'h', w: 280, h: 44, padding: 0, gap: 8, slots };
  }

  if (p.has('label') && (p.has('iconLeft') || p.has('iconRight'))) {
    // Button
    if (p.has('iconLeft'))  slots.push({ type: 'icon', label: 'iconLeft' });
    slots.push({ type: 'text', label: 'Label' });
    if (p.has('iconRight')) slots.push({ type: 'icon', label: 'iconRight' });
    return { layout: 'h', w: 140, h: 36, padding: 10, gap: 5, slots };
  }

  if (p.has('options') && p.has('orientation')) {
    // RadioGroup
    return { layout: 'v', w: 120, h: 64, padding: 0, gap: 8, slots: [
      { type: 'radio', label: 'Option 1' },
      { type: 'radio', label: 'Option 2' },
      { type: 'radio', label: 'Option 3' },
    ]};
  }

  if (p.has('message')) {
    // Toast/notification style
    slots.push({ type: 'icon', label: 'icon' });
    slots.push({ type: 'text', label: 'Message text' });
    return { layout: 'h', w: 320, h: 48, padding: 12, gap: 8, slots };
  }

  if (p.has('label') && p.has('dismissible')) {
    // Pill
    slots.push({ type: 'text', label: 'Label' });
    if (p.has('dismissible')) slots.push({ type: 'icon', label: '×', w: 12 });
    return { layout: 'h', w: 80, h: 24, padding: 10, gap: 4, slots };
  }

  if (p.has('label') && p.has('variant') && !p.has('children')) {
    // Generic single-line labelled component
    if (p.has('iconLeft'))  slots.push({ type: 'icon' });
    slots.push({ type: 'text', label: 'Label' });
    return { layout: 'h', w: 160, h: 36, padding: 10, gap: 5, slots };
  }

  if (p.has('open') && (p.has('children') || p.has('title'))) {
    // Panel/overlay
    return { layout: 'v', w: 320, h: 360, padding: 0, gap: 0, slots: [
      { type: 'header-bar' }, { type: 'area' }, { type: 'footer-bar' }
    ]};
  }

  if (p.has('title') && p.has('children')) {
    // Container component
    return { layout: 'v', w: 280, h: 160, padding: 0, gap: 0, slots: [
      { type: 'header-bar' }, { type: 'area' }
    ]};
  }

  // Fallback: generic block with label
  if (p.has('label') || p.has('title')) {
    slots.push({ type: 'text', label: p.has('title') ? 'Title' : 'Label' });
  }
  if (slots.length === 0) slots.push({ type: 'area', label: componentName });
  return { layout: 'h', w: 200, h: 40, padding: 10, gap: 5, slots };
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

    const props = extractPropsFromInterface(typesPath);
    const anatomy = deriveAnatomy(entry.name, props);

    results.push({ name: entry.name, variants, states, anatomy });
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
