import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Messages from "../../components/Messages/Messages";
import Button from "../../components/Others/Button/Button";

export default function MessagesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem("user-role");
    if (!userRole) {
      navigate("/guestpage");
    }
  }, [navigate]);

  return (
    <main>
      <h1>Messages</h1>
      <Button innerText={"Back to Main Page"} link={"/"} />
      <Messages />
    </main>
  );
}
