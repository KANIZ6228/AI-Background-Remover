import {useState} from "react";
function App(){
  const [file,setFile] =useState(null);
    return (
      <div>

      <h1> 🪄AI Background Remover</h1>

      <p>Upload an image & remove its background</p>
<input
type="file"
accept="image/"
onChange={(event)=> setFile(event.target.files[0])}
/>
      {file && <p>Selected:{file.name}</p>}

      <button> Remove background </button>
      </div>

    );
  }

export default App;