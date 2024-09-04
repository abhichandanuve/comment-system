import React, { useState } from "react";
import { db, auth } from "../firebase"; // Import Firestore and Auth
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./CommentInput.css";

const CommentInput = ({ onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const [user] = useState(auth.currentUser); // Get the currently signed-in user

  const handleSubmit = async () => {
    if (!user) {
      alert("You need to be logged in to comment");
      return;
    }

    if (commentText.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        userId: user.uid,
        userName: user.displayName,
        text: commentText,
        createdAt: serverTimestamp(),
        reactions: { like: 0, love: 0 },
        replies: [],
      });
      setCommentText("");
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <div className="comment-input">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Hi @"
      />
      <div className="comment-actions">
        <div className="rich-text-controls">
          <button>B</button>
          <button>I</button>
          <button>U</button>
          <button>📎</button>
        </div>
        <button className="send-btn" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
