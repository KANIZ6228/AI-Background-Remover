from fastapi import FastAPI,UploadFile,File
from fastapi.responses import FileResponse
from rembg import remove,new_session
from PIL import Image
import io
import time

app=FastAPI()


session=new_session("u2netp")

@app.get("/")
def home():
    return{"message:AI Background remover is working yeeee"}




@app.post("/remove-background")
async def remove_background(file: UploadFile = File(...)):

    start_time =time.time()
    image_data = await file.read()
    input_image = Image.open(io.BytesIO(image_data))
    input_image.thumbnail((800,800))

    output =remove(
        input_image,
        session=session
        )


    output_bytes = io.BytesIO()

    output.save(
        output_bytes,
        format="PNG"
    )

    processing_time = time.time() - start_time

    return FileResponse(
        content=output_bytes.getvalue(),
        media_type="image/png",
        headers={
            "X-Processing-Time": str(round(processing_time, 2))
        }
    )