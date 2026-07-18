// apiNode.js

import { createNode } from './BaseNode';

export const APINode = createNode({
  title: 'API',
  variant: 'action',
  handles: [
    { type: 'target', position: 'left', id: 'body' },
    { type: 'source', position: 'right', id: 'response' },
  ],
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      defaultValue: 'GET',
    },
    { name: 'url', label: 'URL', type: 'text', defaultValue: 'https://' },
  ],
});
