from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import nltk
import fitz  # PyMuPDF
import subprocess
from nltk.sentiment import SentimentIntensityAnalyzer

# 📥 Download NLTK sentiment model
nltk.download("vader_lexicon")
sia = SentimentIntensityAnalyzer()

# 🚀 Initialize FastAPI app
app = FastAPI()

# 🌐 Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🎤 Transcribe voice using whisper.cpp + sentiment analysis
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        file_path = "temp.wav"
        with open(file_path, "wb") as f:
            f.write(await file.read())

        result_txt = "transcription.txt"

        # 🔁 Run whisper.cpp
        result = subprocess.run(
            ["./whisper.cpp/main", "-m", "models/ggml-tiny.en.bin", "-f", file_path, "-otxt"],
            capture_output=True, text=True
        )

        os.remove(file_path)

        if result.returncode != 0:
            return {"error": f"Whisper.cpp failed: {result.stderr}"}

        if not os.path.exists(result_txt):
            return {"error": "Transcription output not found."}

        with open(result_txt, "r") as f:
            text = f.read().strip()
        os.remove(result_txt)

        if not text:
            return {"error": "Transcription was empty."}

        # 😊 Sentiment analysis
        sentiment_score = sia.polarity_scores(text)
        compound = sentiment_score["compound"]
        label = "Positive" if compound > 0.05 else "Negative" if compound < -0.05 else "Neutral"

        return {
            "text": text,
            "sentiment": {"score": sentiment_score, "label": label}
        }

    except Exception as e:
        return {"error": f"Exception occurred: {str(e)}"}


# 📄 Extract text from PDF (resume or JD)
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
