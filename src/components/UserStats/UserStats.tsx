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
  setMessage,
  setMemories,
  setComments,
  handleAccountRemoval,
}) {
  const [status, setStatus] = useState(
    blocked ? "BLOCKED" : suspended ? "SUSPENED" : "ACTIVE"
  );
  const [activitiesCounter, setCounter] = useState(0);
  const [userSuspended, setSuspension] = useState(false);
  const [userBlocked, setBlock] = useState(false);

  useEffect(() => {
    setStatus(userBlocked ? "BLOCKED" : userSuspended ? "SUSPENDED" : "ACTIVE");
  }, [userSuspended, userBlocked]);

  useEffect(() => {
    setSuspension(suspended);
  }, [suspended]);

  useEffect(() => {
    setBlock(blocked);
  }, [blocked]);

  useEffect(() => {
    setCounter(activityCount);
  }, [activityCount]);

  const suspendUser = async () => {
    fetch(`http://localhost:4000/suspendUser/${userId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage("ERROR", data.error);
          return;
        }

        setSuspension(data.suspended);
        setMessage("SUCCESS", data.message);
      });
  };

  const blockUser = async () => {
    fetch(`http://localhost:4000/blockUser/${userId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage("ERROR", data.error);
          return;
        }

        setBlock(data.blocked);
        if (data.blocked) {
          setMemories([]);
          setComments([]);
        } else {
          setCounter(0);
        }
        setMessage("SUCCESS", data.message);
      });
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/deleteUser/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        console.log("User removed successfully");
        setMessage("SUCCESS", "Account was deleted successfully!");
        handleAccountRemoval();
      } else {
        const responseBody = await response.json();
        setMessage("ERROR", responseBody.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                handleClick={deleteUser}
              />
              {userBlocked === true ? (
                <ButtonEvent
                  innerText={"Revoke Block"}
                  buttonColor={"var(--info__blue__main)"}
                  handleClick={blockUser}
                />
              ) : (
                <ButtonEvent
                  innerText={"Block User"}
                  buttonColor={"var(--warning__orange__main)"}
                  handleClick={blockUser}
                />
              )}
              {userSuspended === true ? (
                <ButtonEvent
                  innerText={"Revoke Suspension"}
                  buttonColor={"var(--info__blue__main)"}
                  handleClick={suspendUser}
                />
              ) : (
                <ButtonEvent
                  innerText={"Suspend User"}
                  buttonColor={"var(--warning__orange__main)"}
                  handleClick={suspendUser}
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
            text={`Amount of Suspicious activity registered : ${activitiesCounter}`}
            blockColor={
              activitiesCounter >= 3
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
