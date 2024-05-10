import { Link } from "react-router-dom";
import "./button.css";

export default function Button({
  icon,
  innerText,
  link,
  buttonColor,
  textColor,
  setMessage,
  disabled = false,
}) {
  return (
    <Link to={link} className={disabled ? "disabledLink" : ""}>
      <button
        className="styledButton"
        style={buttonColor != null ? { backgroundColor: buttonColor } : {}}
        disabled={disabled}
      >
        {icon != null ? <img src={icon} alt="buttonIcon" /> : null}
        <p style={textColor != null ? { color: textColor } : {}}>{innerText}</p>
      </button>
    </Link>
  );
}
