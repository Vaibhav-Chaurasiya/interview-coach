import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0f111a] text-white px-6 py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 🔹 Project Name + Tagline */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">PrepMate AI</h2>
          <p className="text-sm text-gray-400">
            Your AI Interview Companion – Practice. Improve. Succeed.
          </p>
        </div>

        {/* 🔹 Features */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-3">Features</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/interview" className="hover:text-yellow-400">Mock Interviews</Link></li>
            <li><Link to="/resume-match" className="hover:text-yellow-400">Resume Match</Link></li>
            <li><Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link></li>
          </ul>
        </div>

        {/* 🔹 Company */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/business" className="hover:text-yellow-400">Business</Link></li>
            <li><Link to="/signup" className="hover:text-yellow-400">Sign Up</Link></li>
            <li><Link to="/signin" className="hover:text-yellow-400">Sign In</Link></li>
          </ul>
        </div>

        {/* 🔹 Support */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* 🔹 Social & Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center space-y-4">
        <div className="flex justify-center space-x-6">
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-yellow-400">
            <FaTwitter />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-yellow-400">
            <FaInstagram />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-yellow-400">
            <FaYoutube />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-yellow-400">
            <FaLinkedin />
          </motion.a>
        </div>
        <p className="text-xs text-gray-500">© 2025 PrepMate AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
