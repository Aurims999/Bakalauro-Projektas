import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Others/Button/Button";
import MemoriesContainer from "../../components/Memories/MemoriesContainer";
import MemoryModal from "../../components/Modals/MemoryModal/MemoryModal";

export default function MemoriesPage({ id }) {
  const [memories, setMemory] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMemoryID, setID] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/memories/${id}`)
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
      />
      <MemoryModal
        memoryId={selectedMemoryID}
        openModal={modal}
        closeModal={() => setModal(false)}
      />
    </main>
  );
}
