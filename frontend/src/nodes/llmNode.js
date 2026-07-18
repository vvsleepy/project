// llmNode.js

import { createNode } from './BaseNode';

export const LLMNode = createNode({
  title: 'LLM',
  description: 'This is a LLM.',
  handles: [
    { type: 'target', position: 'left', id: 'system', style: { top: `${100 / 3}%` } },
    { type: 'target', position: 'left', id: 'prompt', style: { top: `${200 / 3}%` } },
    { type: 'source', position: 'right', id: 'response' },
  ],
});
