import "./trashBin.css";

export default function TrashBin({ deleteMemory }) {
  return (
    <button className="trashBin" onClick={deleteMemory}>
      <img src={`./icons/trashbin.png`} alt="Delete button" />
    </button>
  );
}
