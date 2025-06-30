import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username,
        xp: 0,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-inter">
      {/* Left Panel */}
      <div className="md:w-1/2 w-full bg-gradient-to-br from-yellow-400 to-blue-500 flex items-center justify-center p-10 animate-[pulse_10s_ease-in-out_infinite]">
        <div className="space-y-6 text-left text-white animate-fade-in-up max-w-md">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black drop-shadow-lg">
            PrepMate AI
          </h1>
          <p className="text-xl font-medium text-white drop-shadow-md">
            for Interview Prep & Coaching
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug drop-shadow-md">
            Create your account <br /> to start practicing
          </h2>
          <p className="text-lg drop-shadow">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-black font-bold underline hover:text-yellow-100"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 w-full bg-[#2a2d3a] flex items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSignup}
          className="bg-[#363a4a] w-full max-w-md p-10 rounded-xl shadow-xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-white drop-shadow text-left">Sign Up</h2>

          <div className="space-y-1">
            <label htmlFor="username" className="text-gray-300 text-sm block text-left">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-[#2a2d3a] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-gray-300 text-sm block text-left">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#2a2d3a] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="space-y-1 relative">
            <label htmlFor="password" className="text-gray-300 text-sm block text-left">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 bg-[#2a2d3a] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-md transition transform hover:-translate-y-0.5"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
