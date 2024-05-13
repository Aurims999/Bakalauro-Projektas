import "./button.css";

export default function ButtonEvent({
  icon,
  innerText,
  buttonColor,
  textColor,
  handleClick,
  setMessage,
  disabled = false,
}) {
  return (
    <button
      className="styledButton"
      style={buttonColor != null ? { backgroundColor: buttonColor } : {}}
      disabled={disabled}
      onClick={handleClick}
    >
      {icon != null ? <img src={icon} alt="buttonIcon" /> : null}
      <p style={textColor != null ? { color: textColor } : {}}>{innerText}</p>
    </button>
  );
}
