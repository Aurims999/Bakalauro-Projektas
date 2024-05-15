import { useState } from "react";

import "./like.css";

export default function Like() {
  const [heartIcon, setIcon] = useState("empty");

  const handleClick = () => {
    setIcon(heartIcon === "empty" ? "full" : "empty");
  };

  return (
    <button className="likeButton">
      <img
        src={`/icons/heart-${heartIcon}.png`}
        alt="Like button"
        onClick={handleClick}
      />
    </button>
  );
}
