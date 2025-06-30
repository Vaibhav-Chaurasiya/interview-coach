import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { matchResumeToJD } from "../services/geminiAPI";

function ResumeMatch() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const extractTextViaBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/extract-pdf-text", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.text;
  };

  const handleFiles = async (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    if (!file || !file.name.endsWith(".pdf")) return alert("Only PDF allowed!");
    try {
      const text = await extractTextViaBackend(file);
      if (type === "resume") {
        setResumeFile(file);
        setResumeText(text);
      } else {
        setJdFile(file);
        setJdText(text);
      }
    } catch (err) {
      console.error("❌ Backend PDF extraction failed:", err);
      alert("❌ Failed to extract PDF text from backend.");
    }
  };

  const handleMatch = async () => {
    if (!resumeText || !jdText) return alert("Please upload both PDF files.");
    setLoading(true);
    const output = await matchResumeToJD(resumeText, jdText);
    setResult(output);
    setLoading(false);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <motion.div
      className="min-h-screen bg-[#0f111a] text-white p-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center animate-pulse">
        📄 Resume vs JD Matcher
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <DropBox label="Upload Resume (PDF)" onDrop={(f) => handleFiles(f, "resume")} />
        <DropBox label="Upload Job Description (PDF)" onDrop={(f) => handleFiles(f, "jd")} />
      </div>

      <div className="mt-4 text-sm text-gray-300">
        {resumeFile && <p>📄 Resume: {resumeFile.name}</p>}
        {jdFile && <p>📄 JD: {jdFile.name}</p>}
      </div>

      <button
        onClick={handleMatch}
        disabled={loading}
        className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded shadow transition duration-300"
      >
        {loading ? "⏳ Matching..." : "🔍 Match Resume"}
      </button>

      {result && (
        <motion.div
          ref={resultRef}
          className="mt-10 bg-[#1b1e2b] p-6 rounded-xl shadow-lg max-w-3xl w-full border border-gray-700"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-3 text-white">🧠 Match Result</h3>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">{result}</pre>
        </motion.div>
      )}
    </motion.div>
  );
}

function DropBox({ label, onDrop }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ scale: 1.03 }}
      className="border-2 border-dashed border-yellow-400 rounded-xl p-6 bg-[#1c1e2c] text-center cursor-pointer shadow-md hover:border-yellow-300 transition"
    >
      <input {...getInputProps()} />
      <p className="text-white font-semibold">{label}</p>
      <p className="text-xs text-gray-400 mt-1">Only PDF supported</p>
    </motion.div>
  );
}

export default ResumeMatch;
