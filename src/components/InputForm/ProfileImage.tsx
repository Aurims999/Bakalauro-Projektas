import { useState } from "react";

import "./profileImage.css";

export default function ProfileImage({ userImage, handleNewImage }) {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsArrayBuffer(file);
    }

    reader.onload = () => {
      const base64Image = arrayBufferToBase64(reader.result);
      handleNewImage(reader.result, base64Image);
    };
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return "data:image/png;base64," + window.btoa(binary);
  };

  return (
    <label htmlFor="profileImageInput" className="profileImageInputContainer">
      <input
        type="file"
        id="profileImageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      <img className="profilePicture" src={userImage} alt="Profile Image" />
    </label>
  );
}
