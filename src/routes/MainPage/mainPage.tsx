import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Others/Button/Button";
import MemoriesContainer from "../../components/Memories/MemoriesContainer";
import MemoryModal from "../../components/Modals/MemoryModal/MemoryModal";

export default function MainPage({ setMessage, suspended }) {
  const [memories, setMemory] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMemoryID, setID] = useState("");
  const userRole = sessionStorage.getItem("user-role");

  useEffect(() => {
    fetch("http://localhost:4000/allmemories")
      .then((response) => response.json())
      .then((memory) => {
        setMemory(memory);
      });
  }, []);

  const removeMemoryFromList = (memoryId) => {
    console.log(memories);
    setMemory((previousData) => {
      const updatedMemories = previousData.memories.filter(
        (memory) => memory._id !== memoryId
      );
      return { memories: updatedMemories };
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole) {
      navigate("/guestpage");
    }
  }, [navigate]);

  return (
    <main>
      <h1>Memories</h1>
      {userRole === "USER" && (
        <Button
          icon={"./icons/plus-white.png"}
          innerText={"Share your memory"}
          link={"new-memory"}
          setMessage={setMessage}
          disabled={sessionStorage.getItem("user-suspended") === "true"}
        />
      )}

      <MemoriesContainer
        data={memories}
        setModal={setModal}
        setMemorySelection={setID}
        setMessage={setMessage}
        removeMemory={removeMemoryFromList}
      />
      <MemoryModal
        memoryId={selectedMemoryID}
        openModal={modal}
        closeModal={() => setModal(false)}
        setMessage={setMessage}
        removeMemory={removeMemoryFromList}
      />
    </main>
  );
}
