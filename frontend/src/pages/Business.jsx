import React, { useState } from "react";

const faqData = [
  {
    question: "How does PrepMate AI's assessment work?",
    answer:
      "PrepMate AI uses AI-powered evaluations to assess interview performance, analyzing tone, pace, confidence, and relevance of responses with actionable feedback for continuous improvement.",
  },
  {
    question: "Can PrepMate AI be used across industries?",
    answer:
      "Yes, PrepMate AI is industry-agnostic and can simulate technical, HR, or behavioral interviews tailored for various domains including IT, Sales, Finance, and Management.",
  },
  {
    question: "What features does PrepMate AI offer for businesses?",
    answer:
      "PrepMate AI provides simulated interviews, automated feedback, analytics dashboards for HR teams, resume matching, and customizable interview roles for internal hiring or training.",
  },
  {
    question: "Can PrepMate AI integrate with existing HR systems?",
    answer:
      "Yes, we offer APIs for seamless integration with your Applicant Tracking Systems (ATS) and Learning Management Systems (LMS).",
  },
  {
    question: "Can we customize the platform with our brand?",
    answer:
      "Absolutely! PrepMate AI supports white-label solutions for enterprise partners, allowing you to deliver branded interview experiences."
  },
];

export default function BusinessPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-[#0f111a] text-white font-sans">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Corporate Interview <br /> Training & Coaching.
          </h1>
          <div className="text-3xl md:text-4xl font-bold mt-4 bg-gradient-to-r from-yellow-400 via-green-300 to-blue-500 text-transparent bg-clip-text animate-pulse">
            AI-Driven. Human-Centered.
          </div>
        </div>

        <div className="flex-1 text-gray-300 text-lg space-y-6">
          <p>
            Empower your teams with <span className="font-semibold text-white">AI-based interview preparation</span>, <span className="font-semibold text-white">skill assessment</span>, and <span className="font-semibold text-white">performance analytics</span>. PrepMate AI delivers scalable solutions for L&D, hiring, and corporate upskilling.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded font-semibold transition duration-300">
            Contact Sales
          </button>
        </div>
      </section>

      {/* Industries */}
      <section className="text-center px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Trusted by Professionals Across Sectors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Enterprise HR",
              text: "Automated mock interviews and reporting for talent screening.",
              img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            },
            {
              title: "Universities",
              text: "Career readiness programs for final year students.",
              img: "https://cdn-icons-png.flaticon.com/512/7103/7103013.png"
            },
            {
              title: "Bootcamps",
              text: "Simulated interview practice and resume match feedback.",
              img: "https://cdn-icons-png.flaticon.com/512/4365/4365934.png"
            },
            {
              title: "Training Providers",
              text: "AI analysis for communication & domain-specific interviews.",
              img: "https://cdn-icons-png.flaticon.com/512/10258/10258377.png"
            },
          ].map(({ title, text, img }, i) => (
            <div key={i} className="bg-[#1b1e2b] p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <img src={img} alt={title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-400 mt-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center px-4 py-16 bg-[#12141f]">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Why Businesses Choose PrepMate AI</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "AI Feedback at Scale",
              text: "Automatically assess communication, tone, and knowledge in simulated interviews.",
              img: "https://cdn-icons-png.flaticon.com/512/9513/9513812.png"
            },
            {
              title: "Team Progress Dashboard",
              text: "Track performance, trends, and generate shareable reports.",
              img: "https://cdn-icons-png.flaticon.com/512/7276/7276067.png"
            },
            {
              title: "Easy Integration",
              text: "Sync with ATS/LMS through secure APIs and webhooks.",
              img: "https://cdn-icons-png.flaticon.com/512/7853/7853272.png"
            },
            {
              title: "Custom Branding",
              text: "White-labeled platform for client-specific workflows.",
              img: "https://cdn-icons-png.flaticon.com/512/10014/10014698.png"
            },
          ].map(({ title, text, img }, i) => (
            <div key={i} className="bg-[#1c1e2c] p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <img src={img} alt={title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-400 mt-2">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        {faqData.map((item, idx) => (
          <div
            key={idx}
            className={`bg-[#1d1f2d] p-5 mb-4 rounded-xl transition duration-300 ${
              openIndex === idx ? "bg-[#292c3e]" : ""
            }`}
          >
            <div
              onClick={() => handleToggle(idx)}
              className="flex justify-between cursor-pointer items-center font-semibold text-white"
            >
              <span>{item.question}</span>
              <span className="text-yellow-400 text-xl">
                {openIndex === idx ? "−" : "+"}
              </span>
            </div>
            {openIndex === idx && (
              <p className="mt-3 text-sm text-gray-300">{item.answer}</p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
