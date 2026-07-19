// submit.js

import { useState } from 'react';
import { useStore } from './store';

const BACKEND_URL = 'http://localhost:8000';

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            const { num_nodes, num_edges, is_dag } = await response.json();

            alert(
                'Pipeline Analysis\n\n' +
                `Nodes: ${num_nodes}\n` +
                `Edges: ${num_edges}\n` +
                `DAG: ${is_dag ? 'Yes' : 'No'}`
            );
        } catch (error) {
            alert(
                'Failed to analyze pipeline.\n\n' +
                `${error.message}\n\n` +
                'Make sure the backend is running and try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="submit-bar">
            <button
                type="button"
                className="submit-bar__button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting…' : 'Submit Pipeline'}
            </button>
        </footer>
    );
}
