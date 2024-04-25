import UserImage from "../Others/UserImage/UserImage";

import "./comment.css";

export default function Comment({
  img = "./images/users/default__profile.png",
  children,
}) {
  return (
    <div className="comment">
      <div className="image">
        <UserImage userImage={img} size="40px" />
      </div>
      <div className="commentContainer">
        <h3 className="author">Username</h3>
        <p className="comment">{children}</p>
      </div>
    </div>
  );
}
