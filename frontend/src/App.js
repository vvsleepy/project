import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app">
      <PipelineToolbar />
      <main className="app__canvas">
        <PipelineUI />
      </main>
      <SubmitButton />
    </div>
  );
}

export default App;
