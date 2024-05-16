export default function Message({
  img = "default__banner.png",
  date,
  title,
  message,
}) {
  return (
    <div className="table-row">
      <div className="messageBanner">
        <img src={`/images/memories/${img}`} alt="message banner" />
      </div>

      <p>{date}</p>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
}
