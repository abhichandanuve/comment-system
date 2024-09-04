import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore
import { doc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import "./Comment.css";

const Comment = ({ comment }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = async () => {
    if (replyText.trim() === "") {
      alert("Reply cannot be empty");
      return;
    }

    const reply = {
      id: Date.now(),
      user: "Current User", // Replace with authenticated user's name
      text: replyText,
      reactions: { like: 0, love: 0 },
      createdAt: serverTimestamp(),
    };

    try {
      const commentRef = doc(db, "comments", comment.id);
      await updateDoc(commentRef, {
        replies: arrayUnion(reply),
      });
      setReplyText("");
      setShowReplyInput(false);
    } catch (error) {
      console.error("Error adding reply: ", error);
    }
  };

  return (
    <div className="comment">
      <div className="comment-user">
        <img src="https://via.placeholder.com/50" alt={comment.userName} />
        <strong>{comment.userName}</strong>
      </div>
      <div className="comment-text">
        <p>{comment.text}</p>
        {comment.imageUrl && (
          <div className="comment-image">
            <img src={comment.imageUrl} alt="attached" />
          </div>
        )}
      </div>
      <div className="comment-reactions">
        <span>👍 {comment.reactions.like}</span>
        <span>❤️ {comment.reactions.love}</span>
        <button onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
        <span>{new Date(comment.createdAt?.seconds * 1000).toLocaleTimeString()}</span>
      </div>
      {showReplyInput && (
        <div className="reply-input">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <div className="reply-actions">
            <button onClick={() => setShowReplyInput(false)}>Cancel</button>
            <button onClick={handleReplySubmit}>Send</button>
          </div>
        </div>
      )}
      <div className="comment-replies">
        {comment.replies && comment.replies.length > 0 && comment.replies.map((reply) => (
          <div key={reply.id} className="comment-reply">
            <strong>{reply.user}</strong>
            <p>{reply.text}</p>
            <div className="comment-reactions">
              <span>👍 {reply.reactions.like}</span>
              <span>❤️ {reply.reactions.love}</span>
              <span>{new Date(reply.createdAt?.seconds * 1000).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
