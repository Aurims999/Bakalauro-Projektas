import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StatBlock from "../../components/Others/StatBlock/StatBlock";
import MemoriesContainer from "../../components/Memories/MemoriesContainer";
import CommentsTable from "../../components/Others/Table/CommentsTable";
import ProfilePics from "../../components/ProfilePics/ProfilePics";

import MemoryModal from "../../components/Modals/MemoryModal/MemoryModal";

import "./contentManagement.css";

export default function ContentManagement({ setMessage }) {
  const [suspendedMemories, setMemories] = useState([]);
  const [suspendedComments, setComments] = useState([]);
  const [suspendedProfilePics, setProfiles] = useState([]);
  const [amountOfMemories, setMemoriesCount] = useState(0);
  const [amountOfComments, setCommentsCount] = useState(0);
  const [amountOfProfilePics, setProfileCount] = useState(0);

  const [modal, setModal] = useState(false);
  const [selectedMemoryID, setID] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/suspendedMemories`)
      .then((response) => response.json())
      .then((data) => {
        setMemories(data.memories);
      });

    fetch(`http://localhost:4000/suspendedComments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      });

    fetch(`http://localhost:4000/suspendedProfilePics`)
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data.users);
      });
  }, []);

  useEffect(() => {
    setMemoriesCount(suspendedMemories.length);
  }, [suspendedMemories]);

  useEffect(() => {
    setCommentsCount(suspendedComments.length);
  }, [suspendedComments]);

  useEffect(() => {
    setProfileCount(suspendedProfilePics.length);
  }, [suspendedProfilePics]);

  const removeCommentFromList = (commentId) => {
    setComments((previousData) =>
      previousData.filter((comment) => comment.id !== commentId)
    );
  };

  const removeMemoryFromList = (memoryId) => {
    setMemories((previousData) =>
      previousData.filter((memory) => memory._id !== memoryId)
    );
  };

  useEffect(() => {
    const userRole = sessionStorage.getItem("user-role");
    if (userRole != "ADMIN") {
      navigate("/guestpage");
    }
  }, [navigate]);

  return (
    <>
      <main className="contentManagement-container">
        <h1>Content Restrictions</h1>
        <section className="statistics">
          <StatBlock value={amountOfMemories} title={"Suspended Memories"} />
          <StatBlock value={amountOfComments} title={"Suspended Comments"} />
          <StatBlock
            value={amountOfProfilePics}
            title={"Suspended Profile Images"}
          />
        </section>

        <h2 className="tableTitle">Suspended Memories</h2>

        <MemoriesContainer
          data={{ memories: suspendedMemories }}
          setModal={setModal}
          setMemorySelection={setID}
          setMessage={setMessage}
        />
        <h2 className="tableTitle">Suspended Comments</h2>
        <CommentsTable
          data={{ comments: suspendedComments }}
          setModal={setModal}
          setMemorySelection={setID}
        />
        <h2 className="tableTitle">Suspended Profile Images</h2>
        <ProfilePics images={suspendedProfilePics} />
      </main>
      <MemoryModal
        memoryId={selectedMemoryID}
        openModal={modal}
        closeModal={() => setModal(false)}
        setCommentsCount={setCommentsCount}
        removeComment={removeCommentFromList}
        setMemoriesCount={setMemoriesCount}
        removeMemory={removeMemoryFromList}
        setMessage={setMessage}
      />
    </>
  );
}
