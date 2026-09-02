import { useEffect, useState } from "react";

function ImageInfo({ file }) {

  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {

    if (!file) {
      setDimensions(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    const img = new Image();

    img.onload = () => {
      setDimensions({
        width: img.width,
        height: img.height
      });

      URL.revokeObjectURL(imageUrl);
    };

    img.src = imageUrl;

    return () => {
      URL.revokeObjectURL(imageUrl);
    };

  }, [file]);


  if (!file) {
    return null;
  }

  const fileSize = (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="image-info">

      <h3>📋 Image Information</h3>

      <p>
        <strong>Name:</strong> {file.name}
      </p>

      <p>
        <strong>Format:</strong> {file.type}
      </p>

      <p>
        <strong>Size:</strong> {fileSize} MB
      </p>

      {dimensions && (
        <p>
          <strong>Dimensions:</strong>{" "}
          {dimensions.width} × {dimensions.height} px
        </p>
      )}

    </div>
  );
}

export default ImageInfo;