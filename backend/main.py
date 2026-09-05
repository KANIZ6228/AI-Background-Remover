
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from rembg import remove, new_session
from PIL import Image
import io
import time


app = FastAPI()


# File upload rules
MAX_FILE_SIZE = 10 * 1024 * 1024

ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp"
}


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Load the lightweight AI model
session = new_session("u2netp")


@app.get("/")
def home():
    return {
        "message": "AI Background remover is working yeeee"
    }


@app.post("/remove-background")
async def remove_background(
    file: UploadFile = File(...),
    background_color: str = Form("transparent")
):

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG & WEBP images are allowed."
        )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size exceeds the maximum limit of 10MB."
        )
    start_time = time.time()

    input_image = Image.open(
        io.BytesIO(contents)
    )

    input_image.thumbnail((800, 800))

    output = remove(
        input_image,
        session=session
    )

    if background_color != "transparent":

        background = Image.new(
            "RGBA",
            output.size,
            background_color
        )

        output = Image.alpha_composite(
            background,
            output
        )

    output_bytes = io.BytesIO()

    output.save(
        output_bytes,
        format="PNG"
    )

    processing_time = time.time() - start_time

    return Response(
        content=output_bytes.getvalue(),
        media_type="image/png",
        headers={
            "X-Processing-Time": str(
                round(processing_time, 2)
            )
        }
    )

