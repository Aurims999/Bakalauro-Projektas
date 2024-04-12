import { Outlet, Link } from "react-router-dom";

import "./sidebar.css";

export default function Sidebar() {
  return (
    <>
      <header>
        <div className="mainInfo">
          <Link to='/'>
            <img className="websiteLogo" src="./icons/logo.png" alt="Icon" />
          </Link>
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
              <Link to={'messages'} className="navButton">
                <img
                  src="./icons/email-black.png"
                  alt="Messages' icon"
                  className="icon"
                />
                <p>Messages</p>
              </Link>
            </li>
            <li>
              <Link to={'memories'} className="navButton">
                <img
                  src="./icons/posts-black.png"
                  alt="Memories' icon"
                  className="icon"
                />
                <p>Memories</p>
              </Link>
            </li>
            <li>
              <Link to={'comments'} className="navButton">
                <img
                  src="./icons/comments-black.png"
                  alt="Comments' icon"
                  className="icon"
                />
                <p>Comments</p>
              </Link>
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
      <Outlet/>
    </>
  );
}
