import { useState, useEffect } from "react";
import UserImage from "../Others/UserImage/UserImage";

import RevertButton from "./RevertButton";
import ButtonEvent from "../Others/Button/ButtonEvent";

import "./comment.css";

export default function Comment({
  commentId,
  userId,
  children,
  suspended,
  setCommentsCount,
  removeComment,
}) {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(
    "./images/users/default__profile.png"
  );

  const [commentSuspended, setSuspension] = useState(suspended);

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

  const handleCommentSuspension = async () => {
    fetch(`http://localhost:4000/suspendComment/${commentId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        setSuspension(data.suspended);
        setCommentsCount((prevCount) => {
          if (data.suspended) {
            return prevCount + 1;
          } else {
            removeComment(commentId);
            return prevCount - 1;
          }
        });
      });
  };

  return (
    <div
      className="comment"
      style={
        commentSuspended === true
          ? { backgroundColor: "var(--light__red)" }
          : {}
      }
    >
      <div className="infoBlock">
        <div className="image">
          <UserImage userImage={`./images/users/${userImage}`} size="40px" />
        </div>
        <div className="commentContainer">
          <h3 className="author">{username}</h3>
          <p className="comment">{children}</p>
        </div>
      </div>
      {(sessionStorage.getItem("user-id") === userId ||
        sessionStorage.getItem("user-role") === "ADMIN") && (
        <div className="buttons">
          {sessionStorage.getItem("user-role") === "ADMIN" &&
            (commentSuspended === true ? (
              <ButtonEvent
                innerText={"Revert"}
                buttonColor={"var(--info__blue__main)"}
                handleClick={handleCommentSuspension}
              />
            ) : (
              <ButtonEvent
                innerText={"Suspend"}
                buttonColor={"var(--failure__red__main)"}
                handleClick={handleCommentSuspension}
              />
            ))}
          <button className="removeComment">
            <img src="./icons/cross-black.png" alt="Delete comment" />
          </button>
        </div>
      )}
    </div>
  );
}
