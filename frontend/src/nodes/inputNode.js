// inputNode.js

import { createNode } from './BaseNode';

export const InputNode = createNode({
  title: 'Input',
  handles: [{ type: 'source', position: 'right', id: 'value' }],
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      defaultValue: (id) => id.replace('customInput-', 'input_'),
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'File'],
      defaultValue: 'Text',
    },
  ],
});
