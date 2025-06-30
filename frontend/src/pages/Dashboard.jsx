import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  useEffect(() => {
    const fetchData = async () => {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      }

      const q = query(collection(db, "interview_feedback"), where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHistory(data);
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-[#0f111a] text-white px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 animate-pulse">
            Welcome, {username || "User"}
          </h2>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow transition duration-300"
        >
          Logout
        </button>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-white">
        📜 Your Interview Feedback History
      </h3>

      {history.length > 0 ? (
        <div className="space-y-6">
          {history.map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#1b1e2b] p-5 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="text-yellow-400 font-semibold text-sm">Role: <span className="text-white">{item.role}</span></p>
              <p className="mt-2 text-sm"><b>📝 Question:</b> {item.question}</p>
              <p className="mt-2 text-sm"><b>💬 Your Answer:</b> {item.answer}</p>
              <p className="mt-2 text-sm text-green-400"><b>📢 Feedback:</b> {item.feedback}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-10 text-center">You haven't submitted any interview responses yet.</p>
      )}
    </div>
  );
}

export default Dashboard;
