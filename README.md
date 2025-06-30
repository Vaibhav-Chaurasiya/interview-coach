
# 📚 PrepMate AI – AI Interview Simulator

**PrepMate AI** is your personal AI-powered interview copilot. It helps candidates practice real-world interview questions, get instant AI feedback, and match their resumes to job descriptions using Generative AI.

---

## 🔥 Features

- 🧠 AI-generated interview questions based on role
- ✅ Written answer evaluation with feedback
- 🎤 Audio-based answers with tone/emotion feedback using Whisper + Gemini
- 🔧 STAR-based improvement suggestions
- 📄 Resume vs JD Matching with PDF upload support (via PyMuPDF)
- 📈 Feedback history dashboard (Firebase)
- 🔐 User authentication (Firebase)
- 🎨 Beautiful animated UI using React + Tailwind + Framer Motion

---

## 🛠️ Tech Stack

| Frontend | Backend | AI & NLP | Other |
|----------|---------|----------|-------|
| React + Tailwind CSS | FastAPI | Gemini API (Google) | Firebase Auth & Firestore |
| Vite | Whisper (openai/whisper) | PyMuPDF (fitz) | React Dropzone |
| Framer Motion | ffmpeg | html2pdf.js | Chart.js |

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/prep-mate-ai.git
cd prep-mate-ai
```

### 2. 📦 Install Frontend Dependencies

```bash
cd frontend
npm install
```

Create `.env` in `/frontend`:

```
VITE_API_URL=http://localhost:8000/gemini
```

### 3. 🔙 Backend Setup

```bash
cd ../backend
python -m venv venv
venv\Scripts\activate  # on Windows
pip install -r requirements.txt
```

Install FFmpeg and make sure it’s in PATH:
- [Download FFmpeg](https://www.gyan.dev/ffmpeg/builds/)

Install Whisper + PyMuPDF:

```bash
pip install openai-whisper pymupdf
```

Run backend:

```bash
uvicorn app:app --reload
```

### 4. ▶️ Run Frontend

```bash
cd frontend
npm run dev
```

App will open at:  
🔗 `http://localhost:5173`

---

## 🚀 Usage Highlights

### Interview Section:
- Select your role → Get question
- Submit text or speak via mic
- Get AI-generated feedback + improvement

### Resume Match:
- Upload Resume (PDF)
- Upload JD (PDF)
- AI evaluates and gives score, missing skills, suggestions

### Dashboard:
- View all past questions + feedback

---

## 🔐 Firebase Setup

Set up Firebase Project:
- Auth → Email/Password
- Firestore DB → `users`, `interview_feedback`

Create `/frontend/firebaseConfig.js` with:
```js
export const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX.firebaseapp.com",
  projectId: "XXX",
  ...
};
```

---

## 💡 Coming Soon

- 👨‍💻 Code editor with auto-feedback
- 📊 Skill graph visualization
- 📱 Mobile-friendly responsive UI

---

## 🤝 Credits

- Gemini API — Google AI
- Whisper — OpenAI
- React Mic, Framer Motion, TailwindCSS
- Built with ❤️ by **Vaibhav Chaurasiya & Siddharth Singh**
