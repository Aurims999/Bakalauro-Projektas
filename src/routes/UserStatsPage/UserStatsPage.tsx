import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserStats from "../../components/UserStats/UserStats";
import MemoriesContainer from "../../components/Memories/MemoriesContainer";
import CommentsTable from "../../components/Others/Table/CommentsTable";

import "./userStatsPage.css";

export default function UserStatsPage() {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("default__profile.png");
  const [amountOfActivity, setActivityCount] = useState(0);
  const [suspended, setSuspension] = useState(false);
  const [blocked, setBlock] = useState(false);

  const [userMemories, setMemories] = useState([]);
  const [userComments, setComments] = useState([]);

  const navigate = useNavigate();
  const { userID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/userDetailed/${userID}`)
      .then((response) => response.json())
      .then((user) => {
        const data = user.userData;
        setUsername(data.nickname);
        setImage(data.profileImage);
        setActivityCount(data.amountOfActivity);
        setSuspension(data.suspended);
        setBlock(data.blocked);

        setMemories(data.posts);
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
        <UserStats
          userId={userID}
          profilePic={image}
          name={username}
          suspended={suspended}
          blocked={blocked}
          activityCount={amountOfActivity}
        />
        <h2 className="sectionTitle">{`${username} memories`}</h2>
        <MemoriesContainer data={{ memories: userMemories }} />
        <h2 className="sectionTitle">{`${username} comments`}</h2>
        <CommentsTable data={{ comments: userComments }} />
      </main>
    </>
  );
}
