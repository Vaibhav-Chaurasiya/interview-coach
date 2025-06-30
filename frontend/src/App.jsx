import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import ResumeMatch from "./pages/ResumeMatch";
import BusinessPage from "./pages/Business";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#0f111a] text-white">
        {/* 🔹 Navigation */}
        <Navbar />

        {/* 🔹 Main Routes */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/resume-match" element={<ResumeMatch />} />
            <Route path="/business" element={<BusinessPage />} />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>

        {/* 🔹 Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;