import "./userImage.css";

export default function UserImage({
  userImage = "./images/users/default__profile.png",
  size = "60%",
  onError,
}) {
  return (
    <img
      className="authorProfilePic"
      src={userImage}
      alt="Author's profile image"
      style={{ height: size }}
      onError={onError}
    />
  );
}
