import { useState } from "react";

export default function TableRow({ data }) {
  const [commentId, setCommentId] = useState(0);
  const [comment, setComment] = useState(data.comment);
  const [commentStatus, setStatus] = useState(data.status);

  const [postId, setPostId] = useState(data.postId);
  const [image, setImage] = useState(data.postImage);
  const [title, setTitle] = useState(data.postTitle);

  return (
    <div className="table-row" id="commentId">
      <div className="table-row-block memoryPreview">
        <img src={`./images/memories/${image}`} alt="Memory preview image" />
      </div>
      <div className="table-row-block">
        <p>{title}</p>
      </div>
      <div className="table-row-block">
        <p>"{comment}"</p>
      </div>
      <div className="table-row-block">
        <div className="statusBlock">{commentStatus}</div>
      </div>
    </div>
  );
}
