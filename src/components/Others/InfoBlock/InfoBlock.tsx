import "./infoBlock.css";

export default function InfoBlock({ text, blockColor, textColor }) {
  return (
    <div className="infoBlockComponent">
      <p>{text}</p>
    </div>
  );
}
