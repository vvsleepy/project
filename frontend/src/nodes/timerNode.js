// timerNode.js

import { createNode } from './BaseNode';

export const TimerNode = createNode({
  title: 'Timer',
  variant: 'timing',
  handles: [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'output' },
  ],
  fields: [
    { name: 'delay', label: 'Delay', type: 'text', defaultValue: '1000' },
    {
      name: 'unit',
      label: 'Unit',
      type: 'select',
      options: ['ms', 's', 'min'],
      defaultValue: 'ms',
    },
  ],
});
