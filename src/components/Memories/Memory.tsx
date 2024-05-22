import { useState, useEffect } from "react";

import UserImage from "../Others/UserImage/UserImage";
import Like from "../Others/Like/Like";
import TrashBin from "../Others/TrashBin/TrashBin";

import "./memory.css";

export default function Memory({
  id,
  image,
  title,
  author,
  setModal,
  setSelection,
  setMessage,
  removeMemory,
  suspended,
}) {
  const [memoryId, setID] = useState(id);
  const [authorNickname, setNickname] = useState("");
  const [authorImage, setImage] = useState(
    "/images/users/default__profile.png"
  );
  const [userId, setUserId] = useState("");

  const userRole = sessionStorage.getItem("user-role");

  useEffect(() => {
    setUserId(sessionStorage.getItem("user-id"));
    fetch(`http://localhost:4000/user/${author}`)
      .then((response) => response.json())
      .then((user) => {
        setNickname(user.nickname);
        setImage(user.image);
      });
  }, [author]);

  const deleteMemory = async () => {
    try {
      console.log("Deleting memory");
      const response = await fetch(`http://localhost:4000/deleteMemory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        console.log("Memory removed successfully");
        removeMemory(memoryId);
        setMessage("SUCCESS", "Selected memory was deleted successfully!");
      } else {
        const responseBody = await response.json();
        setMessage("ERROR", responseBody.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let displayMemory = !suspended;
  displayMemory = displayMemory
    ? true
    : sessionStorage.getItem("user-role") === "ADMIN" ||
      sessionStorage.getItem("user-id") === author;

  return displayMemory ? (
    <div className="memory" style={suspended ? { opacity: 0.4 } : {}}>
      <img
        className="postImage"
        src={`/images/memories/${image}`}
        alt="Image of the memory"
        onClick={() => {
          setModal(true);
          setSelection(memoryId);
        }}
      />
      <section className="postInfoContainer">
        <div className="memoryDescription">
          <UserImage userImage={`/images/users/${authorImage}`} />
          <div className="textBlock">
            <h2 className="title">{title}</h2>
            <p>{authorNickname}</p>
          </div>
        </div>
        {userRole === "USER" && userId != author && <Like />}
        {(userRole === "ADMIN" || (userId === author && !suspended)) && (
          <TrashBin deleteMemory={deleteMemory} />
        )}
      </section>
    </div>
  ) : (
    <></>
  );
}
