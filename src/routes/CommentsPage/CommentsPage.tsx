import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../../components/Others/Table/Table";
import Button from "../../components/Others/Button/Button";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);

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
    <main>
      <h1>My Comments</h1>
      <Button innerText={"Back to Main Page"} link={"/"} />
      <Table data={comments} />
    </main>
  );
}
