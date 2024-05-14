import "./profilePics.css";

import ProfilePicsRow from "./ProfilePicsRow";

export default function ProfilePics({ images }) {
  return (
    <div className="profilePics-container dataTable">
      <ProfilePicsRow />
      <ProfilePicsRow />
      <ProfilePicsRow />
      <ProfilePicsRow />
    </div>
  );
}
