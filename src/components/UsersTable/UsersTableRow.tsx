import { useState, useEffect } from "react";
import InfoBlock from "../Others/InfoBlock/InfoBlock";

export default function UsersTableRow({
  userId,
  image,
  username,
  amountOfSuspiciousActivity,
  suspended,
  blocked,
  onClickRow,
}) {
  const [status, setStatus] = useState(
    blocked ? "BLOCKED" : suspended ? "SUSPENDED" : "ACTIVE"
  );

  const [userImage, setImage] = useState(`./images/users/${image}`);
  useEffect(() => {
    setImage(`./images/users/${image}`);
  }, [image]);

  const handleImageError = () => {
    setImage(`/images/users/default__profile.png`);
  };

  return (
    <div className="usersTable-row" onClick={() => onClickRow(userId)}>
      <div className="usersTable-content">
        <div className="usersTable-infoBlock">
          <img
            src={userImage}
            alt={`${username}'s profile image`}
            onError={handleImageError}
          />
          <div className="infoBlock-details">
            <h2>{username}</h2>
            <p>
              Amount of registered suspicious activity:{" "}
              {amountOfSuspiciousActivity}
            </p>
          </div>
        </div>
        <InfoBlock
          text={status}
          blockColor={
            status === "BLOCKED"
              ? "var(--failure__red__back)"
              : status === "SUSPENDED"
              ? "var(--warning__orange__back)"
              : "var(--success__green__back)"
          }
          textColor={
            status === "BLOCKED"
              ? "var(--failure__red__main)"
              : status === "SUSPENDED"
              ? "var(--warning__orange__main)"
              : "var(--success__green__main)"
          }
        />
      </div>
    </div>
  );
}
