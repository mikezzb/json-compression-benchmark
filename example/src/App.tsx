import JsonStat from 'json-minify-stat';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './App.scss';

function App() {
  const [result, setResult] = useState('');
  const statRef = useRef(new JsonStat());
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.forEach(async file => {
      const url = URL.createObjectURL(file);
      const res = await fetch(url);
      const data = await res.json();
      const stat = statRef.current.benchmark(data, false, file.size);
      setResult(JSON.stringify(stat.stat, undefined, 2));
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="App">
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <pre>
          {result || 'Drag n drop some files here, or click to select files'}
        </pre>
      </div>
    </div>
  );
}

export default App;
