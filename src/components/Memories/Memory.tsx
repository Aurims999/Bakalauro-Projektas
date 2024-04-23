import { useState, useEffect } from "react";
import "./memory.css";

export default function Memory({ image, title, author }) {
  const [authorNickname, setNickname] = useState("");
  const [authorImage, setImage] = useState(
    "./images/users/default__profile.png"
  );

  useEffect(() => {}, [author]);

  return (
    <div className="memory">
      <img
        className="postImage"
        src={`./images/memories/${image}`}
        alt="Image of the memory"
      />
      <section className="postInfoContainer">
        <div className="memoryDescription">
          <img
            className="authorProfilePic"
            src={authorImage}
            alt="Author's profile image"
          />
          <div className="textBlock">
            <h2 className="title">{title}</h2>
            <p>{authorNickname}</p>
          </div>
        </div>
        <button>
          <img src="./icons/heart-empty.png" alt="Like button" />
        </button>
      </section>
    </div>
  );
}
