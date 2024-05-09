import { useState } from "react";

import "./profileImage.css";

export default function ProfileImage({ userImage, setUserImage }) {
  const handleImageChange = () => {};

  return (
    <label htmlFor="profileImageInput" className="profileImageInputContainer">
      <input
        type="file"
        id="profileImageInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <img className="profilePicture" src={userImage} alt="Profile Image" />
    </label>
  );
}
