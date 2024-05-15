import "./infoBlock.css";

export default function InfoBlock({
  text,
  blockColor = "var(--warning__orange__back)",
  textColor = "var(--warning__orange__main)",
}) {
  return (
    <div
      className="infoBlockComponent"
      style={{ backgroundColor: blockColor, color: textColor }}
    >
      <p>{text}</p>
    </div>
  );
}
