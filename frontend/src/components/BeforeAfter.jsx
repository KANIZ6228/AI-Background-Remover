function BeforeAfter ({file,result}){

    if(!file && !result){
        return null;
    }
const originalUrl =file
?URL.createObjectURL(file)
:null;

return(
    <div className= "comparison">
    <div className="image-card">
        <h3>Before</h3>
        {originalUrl && (
<img
src={originalUrl}
alt="original"
/>
)}
    </div>
 <div className="image-card">
 <h3>After</h3>

 {result ?(
<img
src={result}
alt="Background removed"
/>

 ) :(
    <p>Waiting for result........</p>
 )}

 </div>
 </div>
 );
}

export default BeforeAfter;
