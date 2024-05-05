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

import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <Routes>
        <Route path="guestpage" element={<GuestPage />} />
        <Route path="login" element={<SideVisuals />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
        </Route>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<MainPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route
            path="memories"
            element={<MemoriesPage id={"6627cd702a16495ae9260b8c"} />}
          />
          <Route path="comments" element={<CommentsPage />} />
        </Route>
        <Route path="new-memory" element={<PostUploadPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
