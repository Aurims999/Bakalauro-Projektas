import "./inputForm.css";
import "./../Others/Button/button.css";

export default function SubmitButton({ icon, text }) {
  return (
    <div className="submitButton">
      <input type="submit" value="Submit" />
      <label htmlFor="Submit" className="styledButton">
        <img src={icon} alt="icon" />
        <p>{text}</p>
      </label>
    </div>
  );
}
