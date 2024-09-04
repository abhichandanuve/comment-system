import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore
import CommentInput from "../components/CommentInput";
import Comment from "../components/Comment";
import "./CommentSection.css";

const CommentSection = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleCommentAdded = () => {
    // This can be used to trigger any state updates or actions after a comment is added
  };

  return (
    <div className="comment-section">
      <div className="comment-header">
        <h2>Comments({comments.length})</h2>
        <div className="comment-sort">
          <button>Latest</button>
          <button>Popular</button>
        </div>
      </div>
      <CommentInput onCommentAdded={handleCommentAdded} />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <div className="loading">Loading...</div>
    </div>
  );
};

export default CommentSection;
