import { useState } from "react";
import UploadBox from "./components/UploadBox";
import ImagePreview from "./components/ImagePreview";
import ImageInfo from "./components/ImageInfo";
import "./App.css";

function App() {
  const [processingTime, setProcessingTime] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const [backgroundColor, setBackgroundColor] = useState("transparent");

  const validateFile = (selectedFile) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(selectedFile.type)) {
      return "Please upload a JPG, PNG or WEBP image.";
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      return "Image must be smaller than 10MB";
    }

    return null;
  };

  const clearImage = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setProcessingTime(null);
    setLoading(false);
    setBackgroundColor("transparent");
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
    setProcessingTime(null);
  };

  const removeBackground = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("background_color", backgroundColor);

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

      const processingTimeHeader = response.headers.get("X-Processing-Time");
      if (processingTimeHeader) {
        setProcessingTime(processingTimeHeader);
      }

      const blob = await response.blob();
      setResult(URL.createObjectURL(blob));
    } catch (requestError) {
      console.error(requestError);
      setError(requestError.message || "An unexpected error occurred.");
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
    <div className="app-container">
      <h1 className="app-title">🪄 AI Background Remover</h1>
      <p className="app-subtitle">
        Upload an image and remove its background using AI
      </p>

      <UploadBox
        onFileSelect={handleFileSelect}
        file={file}
        onClear={clearImage}
      />
      <ImagePreview file={file} />
      <ImageInfo file={file} />

      {file && (
  <div className="background-options">

    <h3>🎨 Choose Background</h3>

    <button
      onClick={() => setBackgroundColor("transparent")}
      className="color-option"
    >
      Transparent
    </button>

    <button
      onClick={() => setBackgroundColor("white")}
      className="color-option white"
    >
      White
    </button>

    <button
      onClick={() => setBackgroundColor("black")}
      className="color-option black"
    >
      Black
    </button>

    <button
      onClick={() => setBackgroundColor("red")}
      className="color-option red"
    >
      Red
    </button>

    <button
      onClick={() => setBackgroundColor("blue")}
      className="color-option blue"
    >
      Blue
    </button>

    <button
      onClick={() => setBackgroundColor("green")}
      className="color-option green"
    >
      Green
    </button>
    <label className="custom-color">
  🌈 Custom Color:

  <input
    type="color"
    value={
      backgroundColor === "transparent"
        ? "#ffffff"
        : backgroundColor
    }
    onChange={(event) =>
      setBackgroundColor(event.target.value)
    }
  />
</label>

  </div>
)}


      <button onClick={removeBackground} disabled={loading || !file}>
        {loading ? "Processing..." : "Remove Background"}
      </button>

      {loading && (
        <div className="processing">
          <div className="spinner"></div>
          <h3>Removing background...</h3>
          <p>Please wait a moment.</p>
        </div>
      )}

      {error && <div className="error-message">❌ {error}</div>}

      {result && (
        <div className="result-section">
          <h2>✨ Background Removed!</h2>
          <div className="result-image-container">
            <img
              src={result}
              alt="Background Removed Result"
              className="result-image"
            />
          </div>

          {processingTime && (
            <p>Processing time: {processingTime} seconds</p>
          )}

          <button onClick={downloadImage} className="download-button">
            ⬇️ Download PNG
          </button>
          <button onClick={clearImage} className="reset-button">
            🔄 Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

