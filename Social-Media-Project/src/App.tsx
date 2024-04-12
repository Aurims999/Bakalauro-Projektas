import { Routes, Route } from "react-router-dom";

import Sidebar from "./routes/Sidebar/Sidebar";
import MainPage from "./routes/MainPage/mainPage";
import MessagesPage from "./routes/MessagesPage/MessagesPage";
import MemoriesPage from "./routes/MemoriesPage/MemoriesPage";
import CommentsPage from "./routes/CommentsPage/CommentsPage";

import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={ <MainPage/>}/>
          <Route path="messages" element={<MessagesPage/>}/>
          <Route path="memories" element={<MemoriesPage/>}/>
          <Route path="comments" element={<CommentsPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
