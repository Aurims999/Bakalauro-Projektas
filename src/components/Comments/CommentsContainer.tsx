import { useState, useEffect } from "react";

import Comment from "./Comment";
import NoData from "../Others/Error-Handling/NoData/NoData";
import "./commentsContainer.css";

export default function CommentsContainer({
  comments,
  setCommentsCount,
  removeComment,
  changeSuspension,
}) {
  const [memoryComments, setComments] = useState([]);

  useEffect(() => {
    setComments(comments);
  }, [comments]);

  return (
    <div
      className={`allComments ${
        !memoryComments || memoryComments.length === 0 ? "noComments" : ""
      }`}
    >
      {memoryComments && memoryComments.length > 0 ? (
        memoryComments.map((comment, index) => (
          <Comment
            key={index}
            commentId={comment._id}
            userId={comment.author}
            suspended={comment.isSuspended}
            setCommentsCount={setCommentsCount}
            removeComment={removeComment}
            changeSuspension={changeSuspension}
          >
            {comment.text}
          </Comment>
        ))
      ) : (
        <NoData
          icon={"./icons/noComments-purple.png"}
          text={"Be the first to comment under this memory!"}
        />
      )}
    </div>
  );
}
