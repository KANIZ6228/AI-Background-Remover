
from fastapi import FastAPI, UploadFile, File, HTTPException
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
async def remove_background(file: UploadFile = File(...)):

    # Check file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG & WEBP images are allowed."
        )

    # Read uploaded file
    contents = await file.read()

    # Check file size
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size exceeds the maximum limit of 10MB."
        )

    # Start timer
    start_time = time.time()

    # Open image using the bytes we already read
    input_image = Image.open(io.BytesIO(contents))

    # Make image smaller to improve processing speed
    input_image.thumbnail((800, 800))

    # Remove background using U2NetP
    output = remove(
        input_image,
        session=session
    )

    # Save result into memory
    output_bytes = io.BytesIO()

    output.save(
        output_bytes,
        format="PNG"
    )

    # Calculate processing time
    processing_time = time.time() - start_time

    # Return PNG image
    return Response(
        content=output_bytes.getvalue(),
        media_type="image/png",
        headers={
            "X-Processing-Time": str(round(processing_time, 2))
        }
    )

