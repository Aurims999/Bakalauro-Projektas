import { Link } from "react-router-dom";
import "./button.css";

export default function Button({ icon, innerText, link, buttonColor, textColor }) {
  return (
    <Link to={link}>
      <button
        className="styledButton"
        style={buttonColor != null ? { backgroundColor: buttonColor } : {}}
      >
        {icon != null ? <img src={icon} alt="buttonIcon" /> : null}
        <p style={textColor != null ? { color: textColor } : {}}>{innerText}</p>
      </button>
    </Link>
    
  );
}
