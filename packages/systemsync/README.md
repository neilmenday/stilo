# SystemSync

Generate and sync UI extensions from any structural design system skeleton.

Part of the [Stilo](https://github.com/neilmenday/stilo) ecosystem.

## Prerequisites

- Node.js 18+
- Git
- GitHub CLI (`gh auth login`)
- Figma personal access token

## Installation

npm install -g @neilmenday/systemsync

## Commands

systemsync sources              — List available source adapters
systemsync new-extension        — Bootstrap a new extension repo
systemsync generate             — Create Figma file from extension components
systemsync compose              — Read Figma compositions → code scaffolds
systemsync sync                 — Sync visual values from Figma to code (Phase 3)
systemsync push                 — Push structure changes to Figma (Phase 5)

## Example — Bob at Acme Corp

systemsync new-extension --name "AcmeUI" --source stilo --github acme-corp/acmeui
cd acmeui
echo "FIGMA_TOKEN=your_token" > .env
# Build your components in src/components/
systemsync generate
# Designer styles in Figma, composes screens
systemsync compose
systemsync sync

## Adapters

Source adapters are read-only. They provide structural contracts —
token shape, hierarchy rules, prop patterns — to SystemSync.
They never receive writes. Structural changes belong to the source
library owner, not to SystemSync or any extension.

Available: stilo
Planned:   material, carbon

To contribute an adapter, submit a PR to neilmenday/stilo.

## Chromatic (optional)

Connect your extension repo at chromatic.com for hosted visual review.
The generated Storybook setup is compatible out of the box.
