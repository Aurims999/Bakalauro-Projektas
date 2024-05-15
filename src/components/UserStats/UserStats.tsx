import ButtonEvent from "../Others/Button/ButtonEvent";
import InfoBlock from "../Others/InfoBlock/InfoBlock";
import "./userStats.css";

export default function UserStats() {
  return (
    <div className="userStats-container dataTable">
      <div className="userStats-header">
        <div className="header-userInfo">
          <img src="/images/users/default__profile.png" alt="" />
          <div className="header-mainInfo">
            <h2>Username</h2>
            <div className="userStats-buttons">
              <ButtonEvent innerText={"BUTTON 1"} />
              <ButtonEvent innerText={"BUTTON 2"} />
              <ButtonEvent innerText={"BUTTON 3"} />
            </div>
          </div>
        </div>
        <div className="header-stats">
          <InfoBlock
            text={"Status : Active"}
            blockColor="var(--main__purple)"
            textColor="white"
          />
          <InfoBlock
            text={"Amount of Suspicious activity registered : 2"}
            blockColor="var(--main__purple)"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
}
