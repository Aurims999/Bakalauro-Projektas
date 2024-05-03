import "./inputForm.css";
import "./../Others/Button/button.css";
import "./inputFormFields.css";

export default function SubmitButton({ icon, text }) {
  return (
    <div className="submitButton">
      <label className="styledButton">
        <input type="submit" value={text} />
        {icon && <img src={icon} alt="icon" />}
        <span>{text}</span>
      </label>
    </div>
  );
}
