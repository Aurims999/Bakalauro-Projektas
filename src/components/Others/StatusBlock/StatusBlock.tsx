import "./statusBlock.css";

export default function StatusBlock({ suspended }) {
  return suspended ? (
    <div className="statusBlock suspended">Suspended</div>
  ) : (
    <div className="statusBlock">Approved</div>
  );
}
