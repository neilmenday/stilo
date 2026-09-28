import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Stilo', ['Foundations', 'Passives', 'Sets', 'Workflows', 'Views']],
      },
    },
    docs: {
      toc: true,
    },
  },
};
export default preview;
