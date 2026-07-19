// draggableNode.js

// Accent colors mirror the node variants in nodes/BaseNode.css
const VARIANT_ACCENTS = {
  default: '#52525b',
  action: '#2563eb',
  logic: '#d97706',
  transform: '#7c3aed',
  data: '#059669',
  timing: '#dc2626',
};

export const DraggableNode = ({ type, label, variant = 'default' }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`draggable-node ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ '--node-accent': VARIANT_ACCENTS[variant] ?? VARIANT_ACCENTS.default }}
        draggable
      >
          <span className="draggable-node__dot" aria-hidden="true" />
          <span>{label}</span>
      </div>
    );
  };
