import "./sidebar.css";

export default function Sidebar() {
  return (
    <header>
      <div className="mainInfo">
        <img className="websiteLogo" src="./icons/logo.png" alt="Icon" />
        <img
          className="profilePicture"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQW8evYocVJa_sUjRKucO4U6qTPHmRLWeIixsej2Jlg&s"
          alt="Profile Image"
        />
        <div className="userDescription">
          <h2>Username</h2>
          <p>Role</p>
        </div>
        <ul>
          <li>
            <img
              src="./icons/email-black.png"
              alt="Messages' icon"
              className="icon"
            />
            <p>Messages</p>
          </li>
          <li>
            <img
              src="./icons/posts-black.png"
              alt="Memories' icon"
              className="icon"
            />
            <p>Memories</p>
          </li>
          <li>
            <img
              src="./icons/comments-black.png"
              alt="Comments' icon"
              className="icon"
            />
            <p>Comments</p>
          </li>
        </ul>
      </div>
      <div className="logoutArea">
        <button className="logout">
          <img
            src="./icons/exit-black.png"
            alt="Logout icon"
            className="icon"
          />
          <p>Logout</p>
        </button>
        <p>@TripShare</p>
      </div>
    </header>
  );
}
