import { useState, useEffect } from "react";

import ProfilePicsRow from "./ProfilePicsRow";
import NoData from "../Others/Error-Handling/NoData/NoData";

import "./profilePics.css";

export default function ProfilePics({ images, removeProfile, setMessage }) {
  const [profilePics, setData] = useState(images);
  useEffect(() => {
    setData(images);
  }, [images]);

  const blockProfile = async (userId) => {
    fetch(`http://localhost:4000/declineProfilePic/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const body = await response.json();
        if (response.ok) {
          removeProfile(userId);
          setMessage("SUCCESS", body.message);
        } else {
          setMessage("ERROR", body.error);
        }
      })
      .catch((error) => {
        setMessage("ERROR", error.message);
      });
  };

  const revokeProfilePicSuspension = async (userId) => {
    fetch(`http://localhost:4000/acceptProfilePic/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const body = await response.json();
        if (response.ok) {
          removeProfile(userId);
          setMessage("SUCCESS", body.message);
        } else {
          setMessage("ERROR", body.error);
        }
      })
      .catch((error) => {
        setMessage("ERROR", error.message);
      });
  };

  return (
    <div className="profilePics-container dataTable">
      {profilePics.length > 0 ? (
        profilePics.map((profile) => {
          return (
            <ProfilePicsRow
              userId={profile.userId}
              nickname={profile.nickname}
              image={profile.suspendedImage}
              removeProfile={removeProfile}
              blockProfile={blockProfile}
              revokeProfile={revokeProfilePicSuspension}
            />
          );
        })
      ) : (
        <NoData
          icon={"./icons/profilePics-purple.png"}
          text={"Currently there are no profile images suspended"}
        />
      )}
    </div>
  );
}
