import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Others/Button/Button";
import MemoriesContainer from "../../components/Memories/MemoriesContainer";
import MemoryModal from "../../components/Modals/MemoryModal/MemoryModal";

export default function MemoriesPage({ id = "", setMessage }) {
  const [memories, setMemory] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMemoryID, setID] = useState("");

  useEffect(() => {
    let userID = id;
    if (id === "") {
      userID = sessionStorage.getItem("user-id");
    }

    fetch(`http://localhost:4000/memories/${userID}`)
      .then((response) => response.json())
      .then((memory) => {
        setMemory(memory);
      });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem("user-role");
    if (!userRole) {
      navigate("/guestpage");
    }
  }, [navigate]);

  return (
    <main>
      <h1>My Memories</h1>
      <Button innerText={"Back to Main Page"} link={"/"} />
      <MemoriesContainer
        data={memories}
        setModal={setModal}
        setMemorySelection={setID}
        setMessage={setMessage}
      />
      <MemoryModal
        memoryId={selectedMemoryID}
        openModal={modal}
        closeModal={() => setModal(false)}
      />
    </main>
  );
}
