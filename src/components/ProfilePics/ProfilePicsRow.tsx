import "./profilePics.css";

import ButtonEvent from "../Others/Button/ButtonEvent";

export default function ProfilePicsRow({ data }) {
  return (
    <div className="profilePics-row">
      <img
        src="./images/users/a35ee524-aa2f-438b-9982-a467d0c712ba.png"
        alt="User's profile pic"
      />
      <div className="profilePics-contentBlock">
        <h2>Username</h2>
        <div className="profilePics-buttons">
          <ButtonEvent
            innerText={"Block User"}
            buttonColor={"var(--failure__red__main)"}
          />
          <ButtonEvent
            innerText={"Permit New Profile Pic"}
            buttonColor={"var(--success__green__main)"}
          />
        </div>
      </div>
    </div>
  );
}
