

function ImageInfo({ file }) {

    if (!file) {
      return(null);
    }


    const fileSize = (file.size/1024*1024).toFixed(2);




return (
     <div className="image-info">
         <h3>📋 Image Information</h3>
          <p> <strong>Name:</strong> {file.name} </p>
           <p> <strong>Format:</strong> {file.type} </p>
            <p> <strong>Size:</strong> {fileSize} MB </p>
             </div>
              );
             }

export default ImageInfo;