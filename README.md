# AI Background Remover

> A focused full-stack image utility that removes backgrounds with an AI segmentation model and returns a downloadable PNG.

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10%2B-3776ab?logo=python&logoColor=white)

## Why This Project

This project demonstrates a complete product flow rather than a standalone model script:

- Responsive React interface with drag-and-drop and file-picker uploads
- Client-side validation for supported formats and the 10 MB size limit
- FastAPI endpoint for multipart image processing
- `rembg` with the lightweight `u2netp` model for background segmentation
- Transparent or solid-color output options
- Processing-time feedback and one-click PNG download
- Separate local and serverless Python entry points for flexible deployment

## Demo Flow

```text
Select image -> Validate file -> Upload multipart form -> AI segmentation
     ^                                                        |
     +------------ Preview result and download PNG <----------+
```

The included `pic.jpg` is a small sample image for local testing.

## Architecture

```text
Browser (React + Vite)
	|
	| POST /api/remove-background
	v
Vite development proxy (local only)
	|
	v
FastAPI application
	|
	+-- validates MIME type and file size
	+-- resizes input to a maximum of 800 x 800 pixels
	+-- runs rembg/u2netp inference
	+-- composites an optional background color
	+-- returns image/png and X-Processing-Time
```

### Repository Layout

```text
backend/main.py              Local FastAPI server
api/index.py                 Vercel/serverless FastAPI entry point
frontend/src/App.jsx         Application state and processing workflow
frontend/src/components/     Upload, preview, and image metadata UI
frontend/vite.config.js      Local /api proxy to FastAPI
requirements.txt             Python dependencies
pic.jpg                      Local demo input
```

The local backend exposes `POST /remove-background`; the Vite proxy maps the browser request `/api/remove-background` to that route. The Vercel entry point exposes `/api/remove-background` directly for serverless deployments.

## Run Locally

### 1. Backend

Create or activate a Python virtual environment and install dependencies:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Start FastAPI from the backend directory:

```powershell
cd backend
python -m uvicorn main:app --reload --port 8000
```

The API is available at `http://127.0.0.1:8000`.

### 2. Frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in a browser. Keep the backend running while using the upload workflow.

### Production Build

```powershell
cd frontend
npm run build
```

## API Contract

### `POST /remove-background`

Accepts `multipart/form-data`:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file` | image file | Yes | JPEG, PNG, or WEBP up to 10 MB |
| `background_color` | string | No | `transparent`, a CSS color name, or a hex color |

Returns a PNG image. The `X-Processing-Time` response header reports inference duration in seconds.

Example:

```powershell
curl.exe -X POST http://127.0.0.1:8000/remove-background `
  -F "file=@pic.jpg" `
  -F "background_color=transparent" `
  --output background-removed.png
```

## Engineering Notes

- The model session is initialized once at startup so requests do not reload the model.
- Images are resized before inference to control latency and memory usage.
- The frontend uses a same-origin `/api` request in development, avoiding hard-coded browser API URLs.
- The project keeps a local FastAPI entry point and a Vercel-compatible entry point so deployment concerns stay separate from the development workflow.

## Future Improvements

1. Add automated backend tests for validation, color compositing, and malformed images.
2. Add frontend component and end-to-end tests for upload, error, loading, and download states.
3. Move model inference to a background job or worker queue for concurrent production traffic.
4. Add authentication, rate limiting, and observability before exposing the API publicly.
5. Add a configurable model provider and optional higher-quality models for professional images.
6. Add batch processing, image history, and cloud storage integrations.
7. Add CI checks for formatting, linting, tests, and frontend production builds.

## License

This project is for demonstration and portfolio use. Review the licenses of `rembg`, its model weights, and any deployment provider before commercial use.