# Stilo

Structural skeleton for UI systems. Stilo provides spacing tokens, radius tokens, and headless component architecture. It has no visual opinion — no colours, no typography, no icons.

## What it is

- Spacing and radius tokens
- Headless component primitives (behaviour, props, accessibility)
- Component composition contracts
- Module and view layout shells

## What it is not

- A visual design system
- Opinionated about colour or typography
- Tied to any employer or product

## Usage

Install via git reference:

```json
"dependencies": {
  "@neilmenday/stilo": "github:neilmenday/stilo#main"
}
```

Or once published to npm:

```bash
npm install @neilmenday/stilo
```

## Extending Stilo

Create a separate repository that depends on this package and applies your visual layer — colours, typography, iconography, motion — on top of the structural primitives. Stilo has no knowledge of what extends it.

See [CONSUMING.md](./CONSUMING.md) for conventions on Storybook structure, the governance contract, and local development setup.
