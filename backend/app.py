from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
import nltk
import fitz  # PyMuPDF
from nltk.sentiment import SentimentIntensityAnalyzer

# NLTK sentiment setup
nltk.download("vader_lexicon")
sia = SentimentIntensityAnalyzer()

# Whisper model
model = whisper.load_model("base")

# FastAPI app
app = FastAPI()

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Transcribe voice + sentiment
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        file_path = "temp.wav"
        with open(file_path, "wb") as f:
            f.write(await file.read())

        result = model.transcribe(file_path)
        os.remove(file_path)

        text = result.get("text", "").strip()
        sentiment_score = sia.polarity_scores(text)
        compound = sentiment_score["compound"]

        label = (
            "Positive" if compound > 0.05
            else "Negative" if compound < -0.05
            else "Neutral"
        )

        return {
            "text": text,
            "sentiment": {"score": sentiment_score, "label": label}
        }

    except Exception as e:
        return {"error": str(e)}


# Extract text from PDF (resume or JD)
@app.post("/extract-pdf-text")
async def extract_pdf_text(file: UploadFile = File(...)):
    try:
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())

        doc = fitz.open(file_path)
        text = "\n".join(page.get_text() for page in doc)
        doc.close()
        os.remove(file_path)

        if not text.strip():
            return {"error": "No text extracted from PDF."}

        return {"text": text.strip()}

    except Exception as e:
        return {"error": f"Failed to extract PDF text: {str(e)}"}
