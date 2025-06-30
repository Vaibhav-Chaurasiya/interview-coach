import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

// ✅ Save feedback
export const saveFeedback = async (userId, data) => {
  try {
    const docRef = collection(db, "interview_feedback");
    await addDoc(docRef, {
      userId,
      role: data.role,
      question: data.question,
      answer: data.answer,
      feedback: data.feedback,
      score: data.score,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
  }
};

// ✅ Get individual user feedback history
export const getUserFeedback = async (userId) => {
  try {
    const q = query(collection(db, "interview_feedback"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
};
