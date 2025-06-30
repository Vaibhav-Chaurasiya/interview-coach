"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const Pricing = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isYearly, setIsYearly] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const plans = [
    {
      title: "PrepMate",
      features: [
        "✓ Upto 5 min Mock Interview",
        "✓ Role-Based Questions",
        "✓ Real-Time Feedback",
        "✓ Create Interviews",
        "✓ Resume Based Practice (5 min)",
      ],
      price: "Free",
      buttonText: "Start for Free",
    },
    {
      title: "PrepMate Rise",
      features: [
        "✓ Upto 30 min Mock Interview",
        "✓ Role-Based Questions",
        "✓ Real-Time Feedback",
        "✓ Resume Based Practice",
        "✓ Company Questions",
        "✓ Salary Negotiation Practice",
      ],
      price: isYearly ? "$79/year" : "$9/month",
      buttonText: "Upgrade Now",
    },
    {
      title: "PrepMate Pro",
      features: [
        "✓ Upload Resume & Job Description",
        "✓ Get Skill Match & Gap Analysis",
        "✓ AI-Powered Resume Suggestions",
        "✓ Improve Resume Using AI Insights",
        "✓ Role Relevancy Score Instantly",
        "✓ Priority Access to New Features",
        "✓ Personalized Interview Curation",
      ],
      price: isYearly ? "$149/year" : "$15/month",
      buttonText: "Go Pro",
    },
  ];

  const faqData = [
    {
      q: "How does PrepMate AI personalize my mock interviews?",
      a: "PrepMate uses your resume and job role to generate highly relevant questions using advanced AI models.",
    },
    {
      q: "Can I switch between plans anytime?",
      a: "Yes, you can upgrade or downgrade at any time and billing will adjust accordingly.",
    },
    {
      q: "Is there a refund policy?",
      a: "Refunds are available on yearly plans if canceled within the first 14 days.",
    },
    {
      q: "Is my data kept private?",
      a: "Absolutely. Your resume and interview data are encrypted and never shared without your permission.",
    },
    {
      q: "How accurate is the AI feedback?",
      a: "Our feedback engine is continuously trained on real-world data and improved monthly.",
    },
  ];

  return (
    <div className="bg-[#0f111a] text-white">
      {/* 🔹 Pricing Header */}
      <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 text-transparent bg-clip-text"
        >
          Subscription Pricing
        </motion.h1>
        <p className="text-lg text-gray-300 mb-6">
          Unlimited interviews with monthly or yearly plans
        </p>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <span className="text-gray-300">Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <div className="w-12 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-400 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-6 transition-transform duration-300"></div>
          </label>
          <span className="text-gray-300">Yearly</span>
        </div>
      </section>

      {/* 🔹 Pricing Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1b1e2b] border border-gray-700 rounded-xl p-5 shadow-xl transition-all duration-300 min-h-[390px] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3 text-center">
                  {plan.title}
                </h3>
                <ul className="space-y-2 mb-4 text-sm text-gray-300">
                  {plan.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-white font-semibold text-lg">{plan.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-2 rounded shadow transition-all duration-300"
                >
                  {plan.buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 FAQ Section */}
      <section className="pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1b1e2b] p-4 rounded-lg border border-gray-700"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="flex justify-between w-full text-left text-white font-medium"
              >
                {item.q}
                <span>{openFAQ === i ? "▲" : "▼"}</span>
              </button>
              {openFAQ === i && (
                <p className="mt-2 text-gray-300 text-sm">{item.a}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
