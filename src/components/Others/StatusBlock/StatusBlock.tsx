import "./statusBlock.css";

export default function StatusBlock({ suspended }) {
  return suspended ? (
    <button className="statusBlock suspended">Suspended</button>
  ) : (
    <button className="statusBlock" disabled>
      Approved
    </button>
  );
}
