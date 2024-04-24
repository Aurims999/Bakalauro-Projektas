import "./commentInput.css";

export default function CommentInput() {
  return (
    <>
      <input type="text" className="addComment" />
      <button className="postComment">Send</button>
    </>
  );
}
