// databaseNode.js

import { createNode } from './BaseNode';

export const DatabaseNode = createNode({
  title: 'Database',
  variant: 'data',
  handles: [
    { type: 'target', position: 'left', id: 'query' },
    { type: 'source', position: 'right', id: 'result' },
  ],
  fields: [
    {
      name: 'operation',
      label: 'Op',
      type: 'select',
      options: ['Query', 'Insert', 'Update', 'Delete'],
      defaultValue: 'Query',
    },
    { name: 'table', label: 'Table', type: 'text', defaultValue: 'users' },
  ],
});
