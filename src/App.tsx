import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import GuestPage from "./routes/GuestPage/GuestPage";
import LoginPage from "./routes/LoginPage/Login/LoginPage";
import RegistrationPage from "./routes/LoginPage/Registration/RegistrationPage";
import SideVisuals from "./routes/LoginPage/SideVisuals/SideVisuals";

import Sidebar from "./routes/Sidebar/Sidebar";
import MainPage from "./routes/MainPage/mainPage";
import MessagesPage from "./routes/MessagesPage/MessagesPage";
import MemoriesPage from "./routes/MemoriesPage/MemoriesPage";
import CommentsPage from "./routes/CommentsPage/CommentsPage";

import PostUploadPage from "./routes/PostUploadPage/PostUploadPage";

import InfoModal from "./components/Modals/InfoModal/InfoModal";

import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [userSuspended, setSuspension] = useState(false);

  const [popup_message, setMessage] = useState("");
  const [popup_type, setType] = useState("");
  const [popup_visible, setVisibility] = useState(false);

  const handlePopupDisplay = (type, message, duration = 2500) => {
    setType(type);
    setMessage(message);
    if (popup_message != "") {
      setVisibility(true);
      setTimeout(() => {
        setVisibility(false);
      }, duration);
    }
  };

  useEffect(() => {
    setSuspension(sessionStorage.getItem("user-suspended") === "true");
    setUserId(sessionStorage.getItem("user-id"));
  }, []);

  return (
    <div className="appContainer">
      <Routes>
        <Route path="guestpage" element={<GuestPage />} />
        <Route path="login" element={<SideVisuals />}>
          <Route
            index
            element={
              <LoginPage
                setMessage={handlePopupDisplay}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="register"
            element={
              <RegistrationPage
                setMessage={handlePopupDisplay}
                setUserId={setUserId}
              />
            }
          />
        </Route>
        <Route
          path="/"
          element={
            <Sidebar
              setMessage={handlePopupDisplay}
              setUserId={setUserId}
              suspendUser={setSuspension}
            />
          }
        >
          <Route
            index
            element={
              <MainPage
                setMessage={handlePopupDisplay}
                suspended={userSuspended}
              />
            }
          />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="memories" element={<MemoriesPage id={userId} />} />
          <Route path="comments" element={<CommentsPage />} />
        </Route>
        <Route
          path="new-memory"
          element={<PostUploadPage setMessage={handlePopupDisplay} />}
        ></Route>
      </Routes>
      <InfoModal
        type={popup_type}
        message={popup_message}
        visible={popup_visible}
      />
    </div>
  );
}

export default App;
