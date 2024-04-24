import { useEffect, useRef } from "react";

import UserImage from "../../Others/UserImage/UserImage";
import CommentsContainer from "../../Comments/CommentsContainer";
import CommentInput from "../../Comments/CommentInput";

import Like from "../../Others/Like/Like";
import Tag from "../../Others/Tag/Tag";

import "./memoryModal.css";

export default function MemoryModal({ openModal, closeModal }) {
  const ref = useRef();

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
          <img src="./images/memories/default__image.png" alt="Memory Image" />
        </div>
        <section className="content">
          <section className="header">
            <div className="info">
              <div className="title">
                <h1>Title</h1>
                <Like />
              </div>
              <div className="userInfo">
                <UserImage size="60px" />
              </div>
            </div>
            <div className="category">
              <p>Category Bubble</p>
            </div>
          </section>

          <section className="description">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem, rerum? Reiciendis tenetur eius eaque quos modi
              saepe velit maiores? Molestiae.
            </p>
            <div className="tags">
              <Tag>Mall</Tag>
              <Tag>Shops</Tag>
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
