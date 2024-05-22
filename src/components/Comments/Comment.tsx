import { useState, useEffect } from "react";
import UserImage from "../Others/UserImage/UserImage";

import ButtonEvent from "../Others/Button/ButtonEvent";

import "./comment.css";

export default function Comment({
  commentId,
  userId,
  children,
  suspended,
  setCommentsCount,
  removeComment,
  changeSuspension,
}) {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(
    "./images/users/default__profile.png"
  );

  const [commentSuspended, setSuspension] = useState(suspended);

  useEffect(() => {
    setSuspension(suspended);
  }, [suspended]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:4000/user/${userId}`)
        .then((response) => response.json())
        .then((userData) => {
          setUsername(userData.nickname);
          setUserImage(userData.image);
        });
    }

    console.log(
      `Suspended: ${commentSuspended} 
      User role: ${sessionStorage.getItem("user-role")} 
      Author: ${sessionStorage.getItem("user-id")} Userid: ${userId}
       Text: ${children}`
    );
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
            changeSuspension(commentId);
            return prevCount - 1;
          }
        });
      });
  };

  const handleCommentRemoval = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/deleteComment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        console.log("Comment removed successfully");
        removeComment(commentId);
      } else {
        const responseBody = await response.json();
        console.log(responseBody);
      }
    } catch (error) {
      console.log(error);
    }
  };

  {
    return !commentSuspended ||
      sessionStorage.getItem("user-role") === "ADMIN" ||
      sessionStorage.getItem("user-id") === userId ? (
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
            <UserImage userImage={`/images/users/${userImage}`} size="40px" />
          </div>
          <div className="commentContainer">
            <h3 className="author">{username}</h3>
            <p className="comment">{children}</p>
          </div>
        </div>
        {((sessionStorage.getItem("user-id") === userId && !suspended) ||
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
            <button className="removeComment" onClick={handleCommentRemoval}>
              <img src="/icons/cross-black.png" alt="Delete comment" />
            </button>
          </div>
        )}
      </div>
    ) : (
      <></>
    );
  }
}
