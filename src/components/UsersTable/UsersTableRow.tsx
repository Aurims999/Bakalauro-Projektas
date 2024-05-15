import InfoBlock from "../Others/InfoBlock/InfoBlock";

export default function UsersTableRow() {
  return (
    <div className="usersTable-row">
      <div className="usersTable-content">
        <div className="usersTable-infoBlock">
          <img
            src="./images/users/default__profile.png"
            alt="User's profile image"
          />
          <div className="infoBlock-details">
            <h2>Username</h2>
            <p>Amount of registered suspicious activity: 0</p>
          </div>
        </div>
        <InfoBlock text={"BLOCKED"} />
      </div>
    </div>
  );
}
