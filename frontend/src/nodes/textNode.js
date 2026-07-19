// textNode.js
// Text node with auto-resizing textarea and {{variable}} parsing.
// Each unique valid identifier inside {{ }} becomes a labeled target
// handle on the left side of the node.

import { useMemo, useRef, useLayoutEffect } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';

// ---------------------------------------------------------------------------
// Variable parsing
// ---------------------------------------------------------------------------

// {{ name }} where name is a valid JS identifier. Whitespace inside the
// braces is tolerated; anything else (spaces in the name, leading digits,
// dots, etc.) is ignored.
const VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

export const parseVariables = (text) => {
  const seen = new Set();
  const variables = [];
  let match;
  VARIABLE_REGEX.lastIndex = 0;
  while ((match = VARIABLE_REGEX.exec(text ?? '')) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      variables.push(name);
    }
  }
  return variables;
};

// ---------------------------------------------------------------------------
// Text measurement (for width growth)
// ---------------------------------------------------------------------------

let measureCtx = null;
const measureLongestLine = (text, font) => {
  if (!measureCtx) {
    measureCtx = document.createElement('canvas').getContext('2d');
  }
  measureCtx.font = font;
  let widest = 0;
  for (const line of String(text ?? '').split('\n')) {
    const w = measureCtx.measureText(line).width;
    if (w > widest) widest = w;
  }
  return widest;
};

const MIN_TEXTAREA_WIDTH = 172; // matches the default 220px node
const MAX_TEXTAREA_WIDTH = 420;
const TEXTAREA_H_PADDING = 18; // padding + border + caret breathing room

// ---------------------------------------------------------------------------
// Auto-resizing textarea
// ---------------------------------------------------------------------------

const AutoTextarea = ({ value, onChange, onResize }) => {
  const ref = useRef(null);
  const fontRef = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!fontRef.current) {
      const s = window.getComputedStyle(el);
      fontRef.current = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    }

    // Width: fit the longest line, clamped to sane bounds.
    const contentWidth =
      measureLongestLine(value, fontRef.current) + TEXTAREA_H_PADDING;
    const width = Math.min(
      Math.max(contentWidth, MIN_TEXTAREA_WIDTH),
      MAX_TEXTAREA_WIDTH
    );
    el.style.width = `${width}px`;

    // Height: collapse then grow to fit content (no scrollbars).
    // scrollHeight excludes borders, so add them back (border-box sizing).
    el.style.height = 'auto';
    const borders = el.offsetHeight - el.clientHeight;
    el.style.height = `${el.scrollHeight + borders}px`;

    onResize?.();
  }, [value, onResize]);

  return (
    <textarea
      ref={ref}
      rows={1}
      className="nodrag base-node__autotextarea"
      value={value}
      onChange={onChange}
      spellCheck={false}
    />
  );
};

// ---------------------------------------------------------------------------
// Node
// ---------------------------------------------------------------------------

const textNodeConfig = (onResize) => ({
  title: 'Text',
  className: 'base-node--textnode',
  handles: (id, data) => {
    const variables = parseVariables(data?.text ?? '{{input}}');
    return [
      { type: 'source', position: 'right', id: 'output' },
      ...variables.map((name, index) => ({
        type: 'target',
        position: 'left',
        id: name,
        label: name,
        style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` },
      })),
    ];
  },
  fields: [
    {
      name: 'text',
      label: 'Text',
      defaultValue: '{{input}}',
      render: ({ value, onChange }) => (
        <AutoTextarea value={value} onChange={onChange} onResize={onResize} />
      ),
    },
  ],
});

export const TextNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();

  // Stable callback: re-measure handle positions after the node resizes,
  // since handle tops are percentage-based.
  const handleResize = useRef(() => updateNodeInternals(id)).current;

  const config = useMemo(() => textNodeConfig(handleResize), [handleResize]);

  return <BaseNode id={id} data={data} config={config} />;
};
