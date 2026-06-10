# Consuming Stilo

This guide covers conventions for building a UI library on top of Stilo.

## Governance contract

Stilo owns structure: types, hooks, spacing tokens, radius tokens, and headless component behaviour. Your library owns visual expression: colours, typography, iconography, and motion. Never rewrite or override Stilo internals — apply your visual layer on top.

## Storybook structure

When building a Storybook for your library, mirror Stilo's category names exactly. Use your library name as the root prefix (e.g. `MendayUI/...`, `CakeUI/...`), then the same category as the equivalent Stilo story.

| Category | Used for |
|---|---|
| `Foundations` | Layout shells, panels, structural primitives (Box, DrawerPanel, AppSidebar, etc.) |
| `Components - Passive` | Self-contained interactive or display components (Button, TextField, Avatar, etc.) |
| `Component Sets` | Multi-component compositions (FunctionsBar, ConditionBuilder, InfoListSet, etc.) |
| `Views` | Full-page or full-panel views (ListView, GridView, CalendarView, etc.) |
| `Icons` | Icon catalogue |
| `DataViz` | Charts and data visualisation |
| `Workflows` | Multi-step or stateful workflow components |

### Example

If Stilo has `Stilo/Components - Passive/Button`, your library's story title should be:

```ts
title: 'YourLibrary/Components - Passive/Button'
```

## Stilo symlink (local development)

To consume Stilo locally without publishing to npm:

```bash
npm link /path/to/stilo
```

Restore the symlink after any `npm install` in your repo:

```bash
npm link @neilmenday/stilo
```
