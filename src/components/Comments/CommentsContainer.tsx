import Comment from "./Comment";
import NoData from "../Others/Error-Handling/NoData/NoData";
import "./commentsContainer.css";

export default function CommentsContainer({
  comments,
  setCommentsCount,
  removeComment,
}) {
  return (
    <div
      className={`allComments ${
        !comments || comments.length === 0 ? "noComments" : ""
      }`}
    >
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comment
            key={index}
            commentId={comment._id}
            userId={comment.author}
            suspended={comment.isSuspended}
            setCommentsCount={setCommentsCount}
            removeComment={removeComment}
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
