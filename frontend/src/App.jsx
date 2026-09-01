import { useState } from "react";
import UploadBox from "./components/UploadBox";
import ImagePreview from "./components/ImagePreview";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ImageInfo from "./components/ImageInfo";
import "./App.css";

function App() {
  const [processingTime, setProcessingTime] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const clearAll = () => {
  setFile(null);
  setResult(null);
  setLoading(false);
  setError(null);
};

  const validateFile = (selectedFile) => {
    const allowTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowTypes.includes(selectedFile.type)) {
      return "Please upload a JPG, PNG or WEBP image.";
    }

    const maxSize = 10 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      return "Image must be smaller than 10MB";
    }

    return null;
  };

  const clearImage = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setProcessingTime(null);
  };
    const downloadImage = () => {
  if (!result) {
    return;
  }

  const link = document.createElement("a");

  link.href = result;
  link.download = "background-removed.png";

  link.click();
};
  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) {
      return;
    }

    const validationError = validateFile(selectedFile);

    if (validationError) {
      setError(validationError);
      setFile(null);
      setResult(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
    setResult(null);
  };

  const removeBackground = async () => {
    if (!file) {
      alert("Please select an image first!!!");
      return;
    }

    setLoading(true);
    setError(null);

    const startTime = Date.now();

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/remove-background",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove background");
      }

      const blob = await response.blob();

      const imageUrl = URL.createObjectURL(blob);

      const endTime = Date.now();

      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

      setProcessingTime(timeTaken);
      setResult(imageUrl);

    } catch (error) {
      console.error(error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result) {
      return;
    }

    const link = document.createElement("a");

    link.href = result;

    link.download = "background-removed.png";

    link.click();
  };

  return (
    <div>
      <h1>🪄 AI Background Remover</h1>

      <p>Upload an image & remove its background</p>

      <UploadBox
        onFileSelect={handleFileSelect}
        file={file}
        onClear={clearImage}
      />

      <ImagePreview file={file} />

      {file && <p>Selected: {file.name}</p>}
      <imageInfo file = {file} />

      <button
        onClick={removeBackground}
        disabled={loading}
      >
        {loading ? "Processing..." : "Remove Background"}
      </button>
      {file && (
  <button
    onClick={clearAll}
    disabled={loading}
  >
    🧹 Clear
  </button>
)}


      {loading && (
        <div className="processing">
          <div className="spinner"></div>

          <h3>Removing background...</h3>

          <p>Please wait a moment.</p>
        </div>
      )}

      {error && (
        <p>{error}</p>
      )}

      {result && (
        <div>
          <h2>Result:</h2>

        <BeforeAfterSlider
  before={URL.createObjectURL(file)}
  after={result}
/>

          <br />

          <button
            onClick={downloadImage}
            className="download-button"
          >
            ⬇️ Download PNG
          </button>

          {processingTime && (
            <p>Processing time: {processingTime} seconds</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

