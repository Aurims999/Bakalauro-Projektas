import { useSearchParams } from "react-router-dom";
import InfoBlock from "../Others/InfoBlock/InfoBlock";
import { useState } from "react";

export default function UsersTableRow({
  userId,
  image,
  username,
  amountOfSuspiciousActivity,
  suspended,
  blocked,
}) {
  const [status, setStatus] = useState(
    blocked ? "BLOCKED" : suspended ? "SUSPENDED" : "ACTIVE"
  );
  return (
    <div className="usersTable-row">
      <div className="usersTable-content">
        <div className="usersTable-infoBlock">
          <img
            src={`./images/users/${image}`}
            alt={`${username}'s profile image`}
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
