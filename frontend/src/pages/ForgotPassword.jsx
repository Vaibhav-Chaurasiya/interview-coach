import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your inbox for password reset instructions.");
    } catch (error) {
      setMessage("Failed to send reset email: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-blue-500 flex items-center justify-center px-4 py-12 font-inter">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Reset Your Password</h2>
        <p className="text-sm text-gray-600">
          Enter your email to receive reset instructions
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-md transition"
          >
            Send Reset Email
          </button>
        </form>

        {message && (
          <p className="text-sm text-green-600 font-medium">{message}</p>
        )}

        <div className="pt-4">
          <Link
            to="/signin"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
