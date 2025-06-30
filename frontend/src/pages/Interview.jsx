import { useState, useRef, useEffect } from "react";
import {
  generateQuestion,
  evaluateAnswer,
  improveAnswer,
  evaluateAudioAnswer,
} from "../services/geminiAPI";
import html2pdf from "html2pdf.js";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

function Interview() {
  const [role, setRole] = useState("Software Engineer");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [improvedAnswer, setImprovedAnswer] = useState("");
  const [sentimentLabel, setSentimentLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [showWaveform, setShowWaveform] = useState(false);
  const exportRef = useRef();
  const { currentUser } = useAuth();
  const recordTimeout = useRef(null);

  const handleStart = async () => {
    setLoading(true);
    try {
      const q = await generateQuestion(role);
      setQuestion(q);
      setAnswer("");
      setFeedback([]);
      setImprovedAnswer("");
      setSentimentLabel("");
    } catch {
      alert("Couldn't load the question. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return alert("Please write your answer.");
    setLoading(true);
    try {
      const fbRaw = await evaluateAnswer(answer);
      const fbPoints = fbRaw.split(/[\n\u2022\-]/).map(line => line.trim()).filter(Boolean);
      setFeedback(fbPoints);

      await addDoc(collection(db, "interview_feedback"), {
        userId: currentUser.uid,
        role,
        question,
        answer,
        feedback: fbRaw,
        improvedAnswer: "",
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      alert("Could not evaluate answer.");
    }
    setLoading(false);
  };

  const handleImprove = async () => {
    setLoading(true);
    try {
      const improved = await improveAnswer(answer);
      setImprovedAnswer(improved);
    } catch {
      alert("Could not improve answer.");
    }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    html2pdf().set({
      margin: 0.5,
      filename: `${role.replace(/\s/g, "_")}_feedback.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }).from(exportRef.current).save();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("file", blob, "audio.wav");

        setLoading(true);
        try {
          const res = await fetch("http://localhost:8000/transcribe", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          setAnswer(data.text);
          setSentimentLabel(data.sentiment?.label || "");

          const fbRaw = await evaluateAudioAnswer(data.text);
          const fbPoints = fbRaw.split(/[\n\u2022\-]/).map((l) => l.trim()).filter(Boolean);
          setFeedback(fbPoints);
        } catch (err) {
          alert("Could not process audio");
        }
        setLoading(false);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
      setShowWaveform(true);

      if (recordTimeout.current) clearTimeout(recordTimeout.current);
      recordTimeout.current = setTimeout(() => stopRecording(), 30000);
    } catch (err) {
      alert("Mic access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setShowWaveform(false);
      clearTimeout(recordTimeout.current);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-white p-6 flex justify-center">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-yellow-400">🧠 Interview Practice</h2>
        </div>

        <div className="mb-6 bg-[#1c1f2b] p-4 rounded-xl shadow">
          <label className="block mb-1 text-sm font-medium text-gray-300">🎯 Choose Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-600 bg-[#0f111a] text-white px-3 py-2 rounded w-full text-sm"
          >
            <option>Software Engineer</option>
            <option>Business Analyst</option>
            <option>Product Manager</option>
          </select>
          <button
            onClick={handleStart}
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full text-sm transition"
          >
            {loading ? "⏳ Loading..." : "🎬 Start Interview"}
          </button>
        </div>

        {question && (
          <motion.div
            className="mb-6 bg-[#1c1f2b] p-4 rounded-xl shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-yellow-300">📝 Question</h3>
            <p className="text-gray-200 mb-3">{question}</p>
            <textarea
              rows={4}
              placeholder="Write your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border border-gray-600 bg-[#0f111a] text-white p-2 rounded text-sm"
            ></textarea>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              {loading ? "⏳ Submitting..." : "✅ Submit Answer"}
            </button>
            <div className="mt-4 text-center">
              <h4 className="text-sm font-medium mb-1 text-gray-400">🎙️ Or speak your answer:</h4>
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={startRecording}
                  disabled={recording || loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm"
                >
                  🎙️ Start
                </button>
                <button
                  onClick={stopRecording}
                  disabled={!recording || loading}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm"
                >
                  ⏹️ Stop
                </button>
              </div>
              {showWaveform && <div className="mt-3 h-4 bg-yellow-400 animate-pulse rounded-full w-1/2 mx-auto"></div>}
              {sentimentLabel && (
                <p className="mt-3 text-sm text-gray-300">
                  📣 <b>Detected Tone:</b> {sentimentLabel === "Positive" ? "😃" : sentimentLabel === "Negative" ? "😞" : "😐"} {sentimentLabel}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {feedback.length > 0 && (
          <motion.div
            ref={exportRef}
            className="bg-[#1c1f2b] p-4 rounded-xl shadow mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="font-semibold text-lg mb-2 text-yellow-300">📢 Feedback</h3>
            <ul className="list-disc pl-5 text-gray-300">
              {feedback.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            {improvedAnswer && (
              <>
                <h3 className="font-semibold text-lg mt-4 mb-2 text-yellow-300">🔧 Improved Answer</h3>
                <p className="text-gray-300 whitespace-pre-line">{improvedAnswer}</p>
              </>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={handleImprove}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
              >
                ✨ Improve Answer
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm"
              >
                📄 Download PDF
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Interview;
