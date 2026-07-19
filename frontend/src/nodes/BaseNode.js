// BaseNode.js
// Shared shell for all pipeline nodes.
//
// config:
//   title        string (required)
//   icon         optional ReactNode rendered beside the title
//   description  optional static text in the body
//   variant      'default' | 'action' | 'logic' | 'transform' | 'data' | 'timing'
//   fields       [{ name, label, type: 'text'|'select', options, defaultValue, render }]
//                - options entries are strings or { value, label }
//                - defaultValue is a value or a function of the node id
//                - render({ value, onChange, id, data }) fully overrides field rendering
//   handles      array of { type, position: 'left'|'right'|'top'|'bottom', id, style },
//                or a function (id, data) => array for handles derived from data
//
// Extra JSX can be passed as `children`.

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './BaseNode.css';

const POSITION_MAP = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const BaseNode = ({ id, data, config, children }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const {
    title,
    icon,
    description,
    variant = 'default',
    fields = [],
    handles = [],
  } = config;

  const resolveDefault = (field) =>
    typeof field.defaultValue === 'function'
      ? field.defaultValue(id)
      : field.defaultValue ?? '';

  const getValue = (field) => data?.[field.name] ?? resolveDefault(field);

  const makeOnChange = (field) => (eventOrValue) => {
    const value =
      eventOrValue && eventOrValue.target !== undefined
        ? eventOrValue.target.value
        : eventOrValue;
    updateNodeField(id, field.name, value);
  };

  const resolvedHandles =
    typeof handles === 'function' ? handles(id, data) : handles;

  const renderField = (field) => {
    const value = getValue(field);
    const onChange = makeOnChange(field);

    if (field.render) {
      return field.render({ value, onChange, id, data });
    }
    if (field.type === 'select') {
      return (
        <select className="nodrag" value={value} onChange={onChange}>
          {field.options.map((opt) => {
            const { value: optValue, label } =
              typeof opt === 'string' ? { value: opt, label: opt } : opt;
            return (
              <option key={optValue} value={optValue}>
                {label}
              </option>
            );
          })}
        </select>
      );
    }
    return (
      <input className="nodrag" type="text" value={value} onChange={onChange} />
    );
  };

  return (
    <div className={`base-node base-node--${variant}`}>
      <div className="base-node__header">
        {icon}
        <span>{title}</span>
      </div>
      <div className="base-node__body">
        {description && <span>{description}</span>}
        {fields.map((field) => (
          <label key={field.name} className="base-node__field">
            <span className="base-node__label">{field.label}</span>
            {renderField(field)}
          </label>
        ))}
        {children}
      </div>
      {resolvedHandles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={POSITION_MAP[h.position]}
          id={`${id}-${h.id}`}
          style={h.style}
        />
      ))}
    </div>
  );
};

// Factory: turns a config into a ReactFlow node component.
export const createNode = (config) => {
  const NodeComponent = ({ id, data }) => (
    <BaseNode id={id} data={data} config={config} />
  );
  NodeComponent.displayName = `${config.title.replace(/\s+/g, '')}Node`;
  return NodeComponent;
};
