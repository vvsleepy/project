// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <header className="toolbar">
            <div className="toolbar__brand">
                <span className="toolbar__title">Pipeline Builder</span>
                <span className="toolbar__subtitle">Drag nodes onto the canvas to build your workflow</span>
            </div>
            <div className="toolbar__nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='api' label='API' variant='action' />
                <DraggableNode type='condition' label='Condition' variant='logic' />
                <DraggableNode type='transform' label='Transform' variant='transform' />
                <DraggableNode type='database' label='Database' variant='data' />
                <DraggableNode type='timer' label='Timer' variant='timing' />
            </div>
        </header>
    );
};
