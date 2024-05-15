import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserStats from "../../components/UserStats/UserStats";
import MemoriesContainer from "../../components/Memories/MemoriesContainer";
import CommentsTable from "../../components/Others/Table/CommentsTable";

import "./userStatsPage.css";

export default function UserStatsPage() {
  const [userMemories, setMemories] = useState([]);
  const [userComments, setComments] = useState([]);

  const navigate = useNavigate();
  const { userID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/memories/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setMemories(data.memories);
      });

    fetch(`http://localhost:4000/comments/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, []);

  useEffect(() => {
    const userRole = sessionStorage.getItem("user-role");
    if (userRole != "ADMIN") {
      navigate("/guestpage");
    }
  }, [navigate]);

  return (
    <>
      <main className="UserStatsPage">
        <h1>User Statistics</h1>
        <UserStats />
        <h2 className="sectionTitle">User's memories</h2>
        <MemoriesContainer data={{ memories: userMemories }} />
        <h2 className="sectionTitle">User's comments</h2>
        <CommentsTable data={{ comments: userComments }} />
      </main>
    </>
  );
}
