import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../components/Others/Table/CommentsTable";
import Button from "../../components/Others/Button/Button";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  /*useEffect(() => {
    const id = sessionStorage.getItem("user-id");
    fetch(`http://localhost:4000/comments/${id}`)
      .then((response) => response.json())
      .then((memory) => {
        setComments(memory);
      });
  }, []);*/

  useEffect(() => {
    const userRole = sessionStorage.getItem("user-role");
    if (userRole != "ADMIN") {
      navigate("/guestpage");
    }
  }, [navigate]);

  return (
    <>
      <main>
        <h1>System Users</h1>
      </main>
    </>
  );
}
