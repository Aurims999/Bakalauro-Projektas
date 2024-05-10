import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import ProfileImage from "../../components/InputForm/ProfileImage";

import "./sidebar.css";

export default function Sidebar({ setUserId, setMessage, suspendUser }) {
  const [userImage, setUserImage] = useState("default__profile.png");
  const [username, setUsername] = useState("");
  const [userRole, setRole] = useState("USER");

  const navigate = useNavigate();

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

  const handleNewProfilePicUpload = async (image, imageUrl) => {
    const evaluateImage = async () => {
      try {
        const blob = new Blob([image]);
        const formData = new FormData();
        formData.append("image", blob);

        const response = await fetch(
          "http://127.0.0.1:5000/evaluateProfilePic",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          setMessage("ERROR", "Failed to upload image");
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        return data.probability_of_fake;
      } catch (error) {
        console.error("Error evaluating new profile pic:", error);
        setMessage("ERROR", error);
      }
    };

    const updateProfilePic = async (image, prediction) => {
      const inputData = {
        userId: sessionStorage.getItem("user-id"),
        image,
        probOfDeepFake: prediction,
      };

      fetch("http://localhost:4000/newProfilePic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Profile pic updated successfully", data);
          if (data.status === "SAFE") {
            setUserImage(data.user.newProfilePic);
            sessionStorage.setItem("user-image", data.user.newProfilePic);
            setMessage("SUCCESS", data.message);
          } else if (data.status === "SUSPENDED") {
            setUserImage("default__profile.png");
            sessionStorage.setItem("user-suspended", "true");
            suspendUser("true");
            setMessage("WARNING", data.message, 8000);
          } else {
            resetSession();
            setMessage("ERROR", data.message, 8000);
            navigate("/guestpage");
          }
        })
        .catch((error) => {
          console.error("Error updating user profile pic:", error);
        });
    };

    const prediction = await evaluateImage();
    updateProfilePic(imageUrl, prediction);
  };

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
          <ProfileImage
            userImage={userImage}
            handleNewImage={handleNewProfilePicUpload}
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
