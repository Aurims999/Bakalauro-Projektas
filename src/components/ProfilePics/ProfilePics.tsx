import { useState, useEffect } from "react";

import ProfilePicsRow from "./ProfilePicsRow";
import NoData from "../Others/Error-Handling/NoData/NoData";

import "./profilePics.css";

export default function ProfilePics({ images }) {
  const [profilePics, setData] = useState(images);
  useEffect(() => {
    setData(images);
  }, [images]);

  return (
    <div className="profilePics-container dataTable">
      {profilePics.length > 0 ? (
        profilePics.map((profile) => {
          return (
            <ProfilePicsRow
              userId={profile.userId}
              nickname={profile.nickname}
              image={profile.suspendedImage}
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
