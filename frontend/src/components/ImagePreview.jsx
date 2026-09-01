function ImagePreview({file}){

if(!file){

return null;
}

const imageUrl = URL.createObjectURL(file);

return(
    <div>
        <h2>preview</h2>


        <img
        src={imageUrl}
        alt="Selected"
        width="400"
        />
    </div>
);


}
export default ImagePreview;