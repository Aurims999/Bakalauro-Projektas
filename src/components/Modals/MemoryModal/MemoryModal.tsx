import { useState, useEffect, useRef } from "react";

import UserImage from "../../Others/UserImage/UserImage";
import CommentsContainer from "../../Comments/CommentsContainer";
import CommentInput from "../../Comments/CommentInput";

import Like from "../../Others/Like/Like";
import Tag from "../../Others/Tag/Tag";
import Category from "../../Others/Category/Category";

import ButtonEvent from "../../Others/Button/ButtonEvent";
import InfoBlock from "../../Others/InfoBlock/InfoBlock";

import "./memoryModal.css";

export default function MemoryModal({
  memoryId,
  openModal,
  closeModal,
  setCommentsCount,
  removeComment,
  setMemoriesCount,
  removeMemory,
  setMessage,
}) {
  const ref = useRef();

  const [img, setImage] = useState("/images/memories/default__image.png");
  const [memoryTitle, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(
    "/images/users/default__profile.png"
  );
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [memorySuspended, setSuspension] = useState(false);

  const userRole = sessionStorage.getItem("user-role");

  useEffect(() => {
    if (memoryId) {
      fetch(`http://localhost:4000/memory/${memoryId}`)
        .then((response) => response.json())
        .then((memory) => {
          setImage(`/images/memories/${memory.image}`);
          setTitle(memory.title);
          setUserImage(memory.profilePic);
          setUsername(memory.username);
          setDescription(memory.description);
          setCategory(memory.category);
          setTags(memory.tags);
          setLikes(memory.likes);
          setComments(memory.comments);
          setSuspension(memory.suspended);
        });
    }
  }, [memoryId]);

  const handleImageError = () => {
    setImage(`/images/memories/default__image.png`);
  };

  const handleMemorySuspension = async () => {
    fetch(`http://localhost:4000/suspendMemory/${memoryId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        setSuspension(data.suspended);
        setMemoriesCount((prevCount) => {
          if (data.suspended) {
            return prevCount + 1;
          } else {
            removeMemory(memoryId);
            return prevCount - 1;
          }
        });
      });
  };

  const handleMemoryBlock = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/deleteMemory/${memoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        console.log("Memory removed successfully");
        setMessage("SUCCESS", "Memory was deleted successfully!");
        closeModal();
        removeMemory(memoryId);
      } else {
        const responseBody = await response.json();
        setMessage("ERROR", responseBody.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCommentFromList = (commentId) => {
    setComments((previousData) =>
      previousData.filter((comment) => comment._id !== commentId)
    );
  };

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className="memoryModal">
      <div className="modal-container">
        <div className="imageDisplay">
          <img src={img} alt="Memory Image" onError={handleImageError} />
        </div>
        <section className="content">
          <section className="modal-header">
            <div className="info">
              <div className="title">
                <h1>{memoryTitle}</h1>
                {userRole === "USER" && <Like />}
              </div>
              <div className="contentBlock">
                <div className="userInfo">
                  <UserImage
                    size="60px"
                    userImage={`/images/users/${userImage}`}
                  />
                  <p>{username}</p>
                </div>
                {memorySuspended && (
                  <InfoBlock text={"Admin Approval Required"} />
                )}
              </div>
            </div>
            <div className="category">
              <Category>{category}</Category>
            </div>
          </section>
          <section className="description">
            {description ? (
              <p>{description}</p>
            ) : (
              <p style={{ opacity: 0.25 }}>
                This memory does not have a description
              </p>
            )}

            <div className="tags">
              {tags.length > 0 ? (
                tags.map((tag) => {
                  return <Tag>{tag}</Tag>;
                })
              ) : (
                <p style={{ opacity: 0.25 }}>
                  This memory does not have any tags
                </p>
              )}
            </div>
          </section>
          <section className="comments">
            <h2>Comments</h2>
            <CommentsContainer
              comments={comments}
              setCommentsCount={setCommentsCount}
              removeComment={removeCommentFromList}
              changeSuspension={removeComment}
            />
            {userRole === "USER" &&
              sessionStorage.getItem("user-suspended") === "false" && (
                <CommentInput memoryId={memoryId} setComments={setComments} />
              )}
            {userRole === "ADMIN" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <ButtonEvent
                  innerText={"Block"}
                  buttonColor={"var(--failure__red__main)"}
                  handleClick={handleMemoryBlock}
                />
                <ButtonEvent
                  innerText={memorySuspended ? "Revert" : "Suspend"}
                  buttonColor={
                    memorySuspended
                      ? "var(--info__blue__main)"
                      : "var(--warning__orange__main)"
                  }
                  handleClick={handleMemorySuspension}
                />
              </div>
            )}
          </section>
        </section>
      </div>
      <button className="exit" onClick={closeModal}>
        <img src="/icons/arrow-white.png" alt="Modal exit button" />
      </button>
    </dialog>
  );
}
