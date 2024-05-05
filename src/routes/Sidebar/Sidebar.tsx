import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import "./sidebar.css";

export default function Sidebar({ setUserId }) {
  const [userImage, setUserImage] = useState(
    "./images/users/default__profile.png"
  );
  const [username, setUsername] = useState("");
  const [userRole, setRole] = useState("USER");

  useEffect(() => {
    const sessionImage = sessionStorage.getItem("user-image");
    const sessionUsername = sessionStorage.getItem("user-nickname");
    const sessionRole = sessionStorage.getItem("user-role");

    if (sessionImage) {
      setUserImage(sessionImage);
    }

    if (sessionUsername) {
      setUsername(sessionUsername);
    }

    if (sessionRole && sessionRole === "ADMIN") {
      setRole("ADMIN");
    }
  }, []);

  const resetSession = () => {
    sessionStorage.removeItem("user-id");
    sessionStorage.removeItem("user-role");
    sessionStorage.removeItem("user-nickname");
    sessionStorage.removeItem("user-image");
    sessionStorage.removeItem("user-suspended");

    setUserId("");
  };

  return (
    <>
      <header>
        <div className="mainInfo">
          <Link to="/">
            <img className="websiteLogo" src="./icons/logo.png" alt="Icon" />
          </Link>
          <img
            className="profilePicture"
            src={`./images/users/${userImage}`}
            alt="Profile Image"
          />
          <div className="userDescription">
            <h2>{username}</h2>
            <p>
              {userRole === "USER" ? "Standard User" : "System Administrator"}
            </p>
          </div>
          <ul>
            {userRole === "USER" && (
              <>
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
              </>
            )}
          </ul>
        </div>
        <div className="logoutArea">
          <Link to={"/guestpage"} className="logout" onClick={resetSession}>
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
