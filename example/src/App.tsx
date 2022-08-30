import JsonStat from "json-minify-stat";
import { useCallback, useEffect, useRef } from "react";
import {useDropzone} from 'react-dropzone'

import './App.scss';


function App() {
  const statRef = useRef(new JsonStat());
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
    acceptedFiles.forEach(async file => {
      const url = URL.createObjectURL(file);
      const res = await fetch(url);
      const data = await res.json();
      statRef.current.benchmark(data);
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="App">
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    </div>
  );
}

export default App;
