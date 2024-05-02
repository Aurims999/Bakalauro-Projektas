import { useState } from "react";
import "./commentInput.css";

export default function CommentInput({ setComments, memoryId }) {
  const [comment, setComment] = useState("");
  const [commentAuthor, setAuthor] = useState("6627cd702a16495ae9260b8c");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      postComment();
    }
  };

  const postComment = () => {
    console.log(comment + " " + commentAuthor);

    const commentData = {
      postId: memoryId,
      author: commentAuthor,
      text: comment,
    };

    fetch("http://localhost:4000/newComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Comment posted successfully", data);
        setComments((prevComments) => [...prevComments, commentData]);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });

    setComment("");
  };

  return (
    <div className="commentInputSection">
      <input
        type="text"
        className="addComment"
        placeholder="Add your comment..."
        value={comment}
        onChange={handleCommentChange}
        onKeyDown={handleKeyDown}
      />
      <button className="postComment" onClick={postComment}>
        <p>Comment</p>
        <img src="./icons/rightArrow-purple.png" alt="Comment submit icon" />
      </button>
    </div>
  );
}
