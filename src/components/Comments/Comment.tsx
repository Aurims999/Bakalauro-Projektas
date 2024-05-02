import { useState, useEffect } from "react";
import UserImage from "../Others/UserImage/UserImage";

import "./comment.css";

export default function Comment({ userId, children }) {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(
    "./images/users/default__profile.png"
  );

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:4000/user/${userId}`)
        .then((response) => response.json())
        .then((userData) => {
          setUsername(userData.nickname);
          setUserImage(userData.image);
        });
    }
  }, [userId]);

  return (
    <div className="comment">
      <div className="image">
        <UserImage userImage={`./images/users/${userImage}`} size="40px" />
      </div>
      <div className="commentContainer">
        <h3 className="author">{username}</h3>
        <p className="comment">{children}</p>
      </div>
    </div>
  );
}
