
import { useState } from "react";

function UploadBox({ onFileSelect, file, onClear }) {

  const [dragging, setDragging] = useState(false);

  // Check whether the selected file is valid
  const validateFile = (selectedFile) => {

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("❌ Only JPG, PNG and WEBP images are allowed.");
      return false;
    }

    if (selectedFile.size > maxSize) {
      alert("❌ Image must be smaller than 10 MB.");
      return false;
    }

    return true;
  };


  // When user chooses an image
  const handleFileChange = (event) => {

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (!validateFile(selectedFile)) {
      return;
    }

    onFileSelect(selectedFile);
  };


  // When user drags an image over the box
  const handleDragOver = (event) => {

    event.preventDefault();

    setDragging(true);
  };


  // When user drops an image
  const handleDrop = (event) => {

    event.preventDefault();

    setDragging(false);

    const selectedFile = event.dataTransfer.files[0];

    if (!selectedFile) {
      return;
    }

    if (!validateFile(selectedFile)) {
      return;
    }

    onFileSelect(selectedFile);
  };


  // When user moves the file away from the box
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

      <h2>📁 Drag & Drop your image</h2>

      <p>or choose a file from your computer</p>


      <input
        id="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
      />


      <label htmlFor="fileInput">
        Choose Image
      </label>


      {/* Show selected file */}
      {file && (
        <div className="selected-file">

          <p>
            ✅ Selected: {file.name}
          </p>

          <button
            onClick={onClear}
          >
            🧹 Clear
          </button>

        </div>
      )}

    </div>
  );
}

export default UploadBox;

