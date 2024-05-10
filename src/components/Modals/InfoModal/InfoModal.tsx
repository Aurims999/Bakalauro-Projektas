import "./infoModal.css";

export default function InfoModal({ type, message, visible = false }) {
  return visible ? (
    <div className={`info-modal-container ${type}`}>
      <img src={`./icons/modals/${type}.png`} alt="info block icon" />
      <p>{message}</p>
    </div>
  ) : null;
}
