import "./commentInput.css";

export default function CommentInput() {
  return (
    <div className="commentInputSection">
      <input
        type="text"
        className="addComment"
        placeholder="Add your comment..."
      />
      <button className="postComment">
        <p>Comment</p>
        <img src="./icons/rightArrow-purple.png" alt="Comment submit icon" />
      </button>
    </div>
  );
}
