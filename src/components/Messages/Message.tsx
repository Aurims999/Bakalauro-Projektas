import { useState, useEffect } from "react";

export default function Message({
  img = "default__banner.png",
  date,
  title,
  message,
}) {
  const [image, setImage] = useState(`/images/memories/${img}`);
  useEffect(() => {
    setImage(`/images/memories/${img}`);
  }, [img]);

  const handleImageError = () => {
    setImage(`/images/memories/default__banner.png`);
  };

  return (
    <div className="table-row">
      <div className="messageBanner">
        <img src={image} alt="message banner" onError={handleImageError} />
      </div>

      <p>{date}</p>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
}
