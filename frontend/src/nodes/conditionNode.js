// conditionNode.js

import { createNode } from './BaseNode';

export const ConditionNode = createNode({
  title: 'Condition',
  variant: 'logic',
  handles: [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'true', style: { top: '33%' } },
    { type: 'source', position: 'right', id: 'false', style: { top: '67%' } },
  ],
  fields: [
    { name: 'condition', label: 'If', type: 'text', defaultValue: 'value > 0' },
  ],
});
