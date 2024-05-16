import { useState } from "react";
import "./commentInput.css";

export default function CommentInput({ setComments, memoryId }) {
  const [comment, setComment] = useState("");
  const [commentAuthor, setAuthor] = useState(
    sessionStorage.getItem("user-id")
  );

  const [disabled, setDisabled] = useState(
    sessionStorage.getItem("user-suspended") === "true"
  );

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      postComment();
    }
  };

  const postComment = async () => {
    let aggressiveComment = false;
    fetch("http://127.0.0.1:5000/evaluateComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        aggressiveComment = data.status === "SUSPENDED" ? true : false;
        const commentData = {
          postId: memoryId,
          author: commentAuthor,
          text: comment,
          isSuspended: aggressiveComment,
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
            if (aggressiveComment) {
              sessionStorage.setItem("user-suspended", "true");
              setDisabled(true);
            }
          })
          .catch((error) => {
            console.error("Error submitting comment:", error);
          });

        setComment("");
      });
  };

  {
    return !disabled ? (
      <div className="commentInputSection">
        <input
          type="text"
          className="addComment"
          placeholder="Add your comment..."
          value={comment}
          onChange={handleCommentChange}
          onKeyDown={handleKeyDown}
          minLength={1}
        />
        <button className="postComment" onClick={postComment}>
          <p>Comment</p>
          <img src="./icons/rightArrow-purple.png" alt="Comment submit icon" />
        </button>
      </div>
    ) : (
      <></>
    );
  }
}
