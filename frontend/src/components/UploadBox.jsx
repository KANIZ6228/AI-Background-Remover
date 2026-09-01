import{useState} from "react";
function UploadBox({ onFileSelect, file, onClear }) {
    const[dragging,setDragging] = useState(false);

    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0];

        if(selectedFile){
            onFileSelect(selectedFile);
        }
    };
    const handleDragOver = (event) => {
        event.preventDefault()
        setDragging(true);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const selectedFile = event.dataTransfer.files[0];
        if(selectedFile){
            onFileSelect(selectedFile);
        }
    };
    const handleDragLeave = () => {
        setDragging(false);
    };

    
return (
  <div
    className={`upload-box ${dragging ? "dragging" : ""}`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >

<div className="upload-icon">
  {file ? "🖼️" : "📁"}
</div>

<h2>
  {dragging
    ? "Drop your image here!"
    : file
      ? file.name
      : "Drag & Drop your image"}
</h2>

<p>
  {file
    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    : "or click the button below to browse"}
</p>

    <input
      id="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={handleFileChange}
    />
<label htmlFor="fileInput">
  {file ? "Choose Another" : "Choose Image"}
</label>
{file && (
  <button
    type="button"
    className="clear-button"
    onClick={onClear}
  >
    ✕ Clear
  </button>
)}
    <p className="upload-hint">
      JPG • PNG • WEBP
      <br />
      Maximum size: 10 MB
    </p>

  </div>
);

}
    export default UploadBox;