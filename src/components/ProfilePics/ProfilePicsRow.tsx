import { useState, useEffect } from "react";
import "./profilePics.css";

import ButtonEvent from "../Others/Button/ButtonEvent";

export default function ProfilePicsRow({
  userId,
  nickname,
  image,
  blockProfile,
  revokeProfile,
}) {
  const [userImage, setImage] = useState(`/images/users/${image}`);

  useEffect(() => {
    setImage(`/images/users/${image}`);
  }, [image]);

  const handleImageError = () => {
    setImage(`/images/users/default__profile.png`);
  };

  return (
    <div className="profilePics-row">
      <img
        src={userImage}
        alt={`${nickname} suspended profile pic`}
        onError={handleImageError}
      />
      <div className="profilePics-contentBlock">
        <h2>{nickname}</h2>
        <div className="profilePics-buttons">
          <ButtonEvent
            innerText={"Block User"}
            buttonColor={"var(--failure__red__main)"}
            handleClick={() => blockProfile(userId)}
          />
          <ButtonEvent
            innerText={"Permit New Profile Pic"}
            buttonColor={"var(--success__green__main)"}
            handleClick={() => revokeProfile(userId)}
          />
        </div>
      </div>
    </div>
  );
}
