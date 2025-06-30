// Load Gemini API from .env
const API_URL = import.meta.env.VITE_API_URL;

// Generic Gemini Fetcher
const fetchGeminiResponse = async (prompt) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "AI response unavailable.";
    return text.replace(/[*_`~]+/g, "");
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to fetch response from Gemini.";
  }
};


// Generate Interview Question

export const generateQuestion = async (role) => {
  const prompt = `You are a senior interviewer for the role of ${role}.
Generate a real-world interview question that candidates usually face.
Keep it practical and job-relevant.
Limit it to 40-50 words.
Only output the question, no explanation.`;
  return await fetchGeminiResponse(prompt);
};


// Evaluate Written Answer

export const evaluateAnswer = async (answer) => {
  const prompt = `You are an AI interview coach.

Evaluate the following interview answer:

"${answer}"

Give feedback in bullet points:

Score (out of 10): X/10

Strengths:
- point 1
- point 2

Areas of Improvement:
- point 1
- point 2

Use simple English. Be friendly. No *, **, or symbols.`;
  return await fetchGeminiResponse(prompt);
};


// Improve Answer (STAR Format)

export const improveAnswer = async (answer) => {
  const prompt = `You are an AI coach.

Rewrite this interview answer using the STAR method.
Make it short (under 120 words), easy to speak, and well-structured.

Answer:
"${answer}"`;
  return await fetchGeminiResponse(prompt);
};


// Evaluate Audio Answer (Transcript-Based)

export const evaluateAudioAnswer = async (transcript) => {
  const prompt = `You are an AI interview evaluator.

Analyze this audio-transcribed response:

"${transcript}"

Give feedback on:

1. Speaking Clarity
2. Tone (choose from 🔥 Confident, 😐 Neutral, 😓 Nervous)
3. Emotion (if detectable)
4. Filler words or hesitations
5. Suggestions to improve

Use plain English. Bullet points only.
Return usable feedback for a beginner candidate.`;
  return await fetchGeminiResponse(prompt);
};


// Analyze Tone + Emotion

export const analyzeToneAndEmotion = async (transcript) => {
  const prompt = `You are an AI communication expert.

Analyze this transcribed answer:

"${transcript}"

Summarize:
- Tone (🔥 Confident, 😐 Neutral, 😓 Nervous)
- Emotion (e.g., excited, anxious, calm)
- Signs of uncertainty (if any)
- Tips to sound more confident

Use short bullet points and emojis. No markdown formatting.`;
  return await fetchGeminiResponse(prompt);
};


// Resume vs JD Matching

export const matchResumeToJD = async (resume, jd) => {
  const prompt = `You are an ATS evaluator.

Given this resume and job description:

Resume:
${resume}

Job Description:
${jd}

Evaluate and output:

Match Score: X/100

Missing Skills:
- skill 1
- skill 2

Suggestions:
- point 1
- point 2

Use bullet points only. No extra explanation.`;
  return await fetchGeminiResponse(prompt);
};
