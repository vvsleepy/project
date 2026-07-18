// outputNode.js

import { createNode } from './BaseNode';

export const OutputNode = createNode({
  title: 'Output',
  handles: [{ type: 'target', position: 'left', id: 'value' }],
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      defaultValue: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      // value 'File' for label 'Image' preserved from the original implementation
      options: ['Text', { value: 'File', label: 'Image' }],
      defaultValue: 'Text',
    },
  ],
});
