import { useState } from "react";

import StatusBlock from "../StatusBlock/StatusBlock";

export default function TableRowAdmin({ data, setModal, setSelection }) {
  const [comment, setComment] = useState(data.comment);

  const [postId, setPostId] = useState(data);
  const [image, setImage] = useState(data.postImage);
  const [title, setTitle] = useState(data.postTitle);

  const handleMemorySelection = () => {
    setModal(true);
    setSelection(postId);
  };

  return (
    <div className="table-row" onClick={handleMemorySelection}>
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
        <StatusBlock suspended={commentStatus} />
      </div>
    </div>
  );
}
