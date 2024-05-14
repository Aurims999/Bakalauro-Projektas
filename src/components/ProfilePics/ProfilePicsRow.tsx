import "./profilePics.css";

import ButtonEvent from "../Others/Button/ButtonEvent";

export default function ProfilePicsRow({
  userId,
  nickname,
  image,
  blockProfile,
  revokeProfile,
}) {
  return (
    <div className="profilePics-row">
      <img
        src={`./images/users/${image}`}
        alt={`${nickname} suspended profile pic`}
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
