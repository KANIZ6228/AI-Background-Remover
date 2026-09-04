function ImagePreview({file}){

if(!file){

return null;
}

const imageUrl = URL.createObjectURL(file);

return(
  <div className="image-preview">
        <h2>Original image </h2>


        <img
src={imageUrl}
 alt="Original uploaded image"
  className="preview-image"
        />
    </div>
);


}
export default ImagePreview;