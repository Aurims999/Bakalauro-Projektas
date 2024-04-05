import "./memory.css";

export default function Memory({ image, title, author, authorImage }) {
  return (
    <div className="memory">
      <img className="postImage" src={image} alt="Image of the memory" />
      <section className="postInfoContainer">
        <div className="memoryDescription">
          <img
            className="authorProfilePic"
            src={authorImage}
            alt="Author's profile image"
          />
          <div className="textBlock">
            <h2 className="title">{title}</h2>
            <p>{author}</p>
          </div>
        </div>
        <button>
          <img src="./icons/heart-empty.png" alt="Like button" />
        </button>
      </section>
    </div>
  );
}
