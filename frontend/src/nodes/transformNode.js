// transformNode.js

import { createNode } from './BaseNode';

export const TransformNode = createNode({
  title: 'Transform',
  variant: 'transform',
  handles: [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'output' },
  ],
  fields: [
    {
      name: 'operation',
      label: 'Op',
      type: 'select',
      options: ['Uppercase', 'Lowercase', 'Trim', 'JSON Parse'],
      defaultValue: 'Uppercase',
    },
  ],
});
