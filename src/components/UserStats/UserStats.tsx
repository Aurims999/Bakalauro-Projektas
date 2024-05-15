import { useState, useEffect } from "react";

import ButtonEvent from "../Others/Button/ButtonEvent";
import InfoBlock from "../Others/InfoBlock/InfoBlock";
import "./userStats.css";

export default function UserStats({
  userId,
  profilePic,
  name,
  suspended,
  blocked,
  activityCount,
}) {
  const [status, setStatus] = useState(
    blocked ? "BLOCKED" : suspended ? "SUSPENED" : "ACTIVE"
  );

  return (
    <div className="userStats-container dataTable">
      <div className="userStats-header">
        <div className="header-userInfo">
          <img
            src={`/images/users/${profilePic}`}
            alt={`${name}'s profile pic`}
          />
          <div className="header-mainInfo">
            <h2>{name}</h2>
            <div className="userStats-buttons">
              <ButtonEvent
                innerText={"Delete Account"}
                buttonColor={"var(--failure__red__main)"}
              />
              {status === "BLOCKED" ? (
                <ButtonEvent
                  innerText={"Revoke Block"}
                  buttonColor={"var(--info__blue__main)"}
                />
              ) : (
                <ButtonEvent
                  innerText={"Block User"}
                  buttonColor={"var(--warning__orange__main)"}
                />
              )}
              {status === "SUSPENDED" ? (
                <ButtonEvent
                  innerText={"Revoke Suspension"}
                  buttonColor={"var(--info__blue__main)"}
                />
              ) : (
                <ButtonEvent
                  innerText={"Suspend User"}
                  buttonColor={"var(--warning__orange__main)"}
                />
              )}
            </div>
          </div>
        </div>
        <div className="header-stats">
          <InfoBlock
            text={`Status : ${status}`}
            blockColor={`var(--status__${status})`}
            textColor="white"
          />
          <InfoBlock
            text={`Amount of Suspicious activity registered : ${activityCount}`}
            blockColor={
              activityCount >= 3
                ? "var(--failure__red__main)"
                : "var(--status__ACTIVE)"
            }
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
}
