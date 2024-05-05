import { Outlet, Link } from "react-router-dom";

import "./sidebar.css";

export default function Sidebar() {
  return (
    <>
      <header>
        <div className="mainInfo">
          <Link to="/">
            <img className="websiteLogo" src="./icons/logo.png" alt="Icon" />
          </Link>
          <img
            className="profilePicture"
            src="./images/users/example__profilePic-2.jpg"
            alt="Profile Image"
          />
          <div className="userDescription">
            <h2>{"Mountains Lover <3"}</h2>
            <p>Standard User</p>
          </div>
          <ul>
            <li>
              <Link to={"messages"} className="navButton">
                <img
                  src="./icons/email-black.png"
                  alt="Messages' icon"
                  className="icon"
                />
                <p>Messages</p>
              </Link>
            </li>
            <li>
              <Link to={"memories"} className="navButton">
                <img
                  src="./icons/posts-black.png"
                  alt="Memories' icon"
                  className="icon"
                />
                <p>Memories</p>
              </Link>
            </li>
            <li>
              <Link to={"comments"} className="navButton">
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
          <Link to={"/guestpage"} className="logout">
            <img
              src="./icons/exit-black.png"
              alt="Logout icon"
              className="icon"
            />
            <p>Logout</p>
          </Link>
          <p>@TripShare</p>
        </div>
      </header>
      <Outlet />
    </>
  );
}
