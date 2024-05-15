import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UsersTable from "../../components/UsersTable/UsersTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  const handleRowClick = (userID) => {
    navigate(`/userData/${userID}`);
  };

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
        <UsersTable data={users} onClickRow={handleRowClick} />
      </main>
    </>
  );
}
