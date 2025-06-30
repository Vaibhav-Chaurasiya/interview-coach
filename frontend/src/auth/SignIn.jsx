import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      alert("Google sign-in failed");
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
          <p className="text-xl font-medium drop-shadow-md">
            for Interview Prep & Coaching
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug drop-shadow-md">
            Practice Smart Interviews <br /> Powered by AI
          </h2>
          <p className="text-lg drop-shadow">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-black font-bold underline hover:text-yellow-100"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="md:w-1/2 w-full bg-[#2a2d3a] flex items-center justify-center px-6 py-12">
        <div className="bg-[#363a4a] w-full max-w-md p-10 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-white text-left drop-shadow">
            Log In
          </h2>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-[#4285f4] hover:bg-[#357ae8] text-white py-3 px-4 rounded-md transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <div className="flex-grow border-t border-gray-600"></div>
            or
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="text-gray-300 text-sm block text-left">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 bg-[#2a2d3a] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Type your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-gray-300 text-sm text-left">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-yellow-400 text-xs hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full p-3 bg-[#2a2d3a] border border-gray-600 text-white rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-md transition transform hover:-translate-y-0.5"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
