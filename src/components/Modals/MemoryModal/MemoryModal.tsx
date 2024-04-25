import { useState, useEffect, useRef } from "react";

import UserImage from "../../Others/UserImage/UserImage";
import CommentsContainer from "../../Comments/CommentsContainer";
import CommentInput from "../../Comments/CommentInput";

import Like from "../../Others/Like/Like";
import Tag from "../../Others/Tag/Tag";
import Category from "../../Others/Category/Category";

import "./memoryModal.css";

export default function MemoryModal({ memoryId, openModal, closeModal }) {
  const ref = useRef();

  const [img, setImage] = useState("./images/memories/default__image.png");
  const [memoryTitle, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(
    "./images/users/default__profile.png"
  );
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {}, [memoryId]);

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
          <img src={img} alt="Memory Image" />
        </div>
        <section className="content">
          <section className="header">
            <div className="info">
              <div className="title">
                <h1>{memoryTitle}</h1>
                <Like />
              </div>
              <div className="userInfo">
                <UserImage size="60px" userImage={userImage} />
                <p>{username}</p>
              </div>
            </div>
            <div className="category">
              <Category>{category}</Category>
            </div>
          </section>
          <section className="description">
            <p>{description}</p>
            <div className="tags">
              <Tag>Example tag 1</Tag>
              <Tag>Example tag 2</Tag>
            </div>
          </section>
          <section className="comments">
            <h2>Comments</h2>
            <CommentsContainer />
            <CommentInput />
          </section>
        </section>
      </div>
      <button className="exit" onClick={closeModal}>
        <img src="./icons/arrow-white.png" alt="Modal exit button" />
      </button>
    </dialog>
  );
}
