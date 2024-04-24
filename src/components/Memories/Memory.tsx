import { useState, useEffect } from "react";

import UserImage from "../Others/UserImage/UserImage";
import Like from "../Others/Like/Like";

import "./memory.css";

export default function Memory({ image, title, author }) {
  const [authorNickname, setNickname] = useState("");
  const [authorImage, setImage] = useState(
    "./images/users/default__profile.png"
  );

  useEffect(() => {
    fetch(`http://localhost:4000/user/${author}`)
      .then((response) => response.json())
      .then((user) => {
        setNickname(user.nickname);
        setImage(user.image);
      });
  }, [author]);

  return (
    <div className="memory">
      <img
        className="postImage"
        src={`./images/memories/${image}`}
        alt="Image of the memory"
      />
      <section className="postInfoContainer">
        <div className="memoryDescription">
          <UserImage userImage={`./images/users/${authorImage}`} />
          <div className="textBlock">
            <h2 className="title">{title}</h2>
            <p>{authorNickname}</p>
          </div>
        </div>
        <Like />
      </section>
    </div>
  );
}
