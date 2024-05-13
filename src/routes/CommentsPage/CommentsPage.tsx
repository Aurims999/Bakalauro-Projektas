import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CommentsTable from "../../components/Others/Table/CommentsTable";
import Button from "../../components/Others/Button/Button";
import MemoryModal from "../../components/Modals/MemoryModal/MemoryModal";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMemoryID, setID] = useState("");

  useEffect(() => {
    console.log(selectedMemoryID);
  }, [selectedMemoryID]);

  const navigate = useNavigate();

  useEffect(() => {
    const id = sessionStorage.getItem("user-id");
    fetch(`http://localhost:4000/comments/${id}`)
      .then((response) => response.json())
      .then((memory) => {
        setComments(memory);
      });
  }, []);

  useEffect(() => {
    const userRole = sessionStorage.getItem("user-role");
    if (!userRole) {
      navigate("/guestpage");
    }
  }, [navigate]);

  return (
    <>
      <main>
        <h1>My Comments</h1>
        <Button innerText={"Back to Main Page"} link={"/"} />
        <CommentsTable
          data={comments}
          setModal={setModal}
          setMemorySelection={setID}
        />
      </main>
      <MemoryModal
        memoryId={selectedMemoryID}
        openModal={modal}
        closeModal={() => setModal(false)}
      />
    </>
  );
}
