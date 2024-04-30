import { useState, useEffect } from "react";
import Button from "../../components/Others/Button/Button";

import MemoriesContainer from "../../components/Memories/MemoriesContainer";
import MemoryModal from "../../components/Modals/MemoryModal/MemoryModal";

export default function MemoriesPage({id}) {
  const [memories, setMemory] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMemoryID, setID] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/memories")
      .then((response) => response.json())
      .then((memory) => {
        setMemory(memory);
      });
  }, []);

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
