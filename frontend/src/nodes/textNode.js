// textNode.js

import { createNode } from './BaseNode';

export const TextNode = createNode({
  title: 'Text',
  handles: [{ type: 'source', position: 'right', id: 'output' }],
  fields: [
    { name: 'text', label: 'Text', type: 'text', defaultValue: '{{input}}' },
  ],
});
