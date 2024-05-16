import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";

import Messages from "../../components/Messages/Messages";
import Button from "../../components/Others/Button/Button";

export default function MessagesPage({ id }) {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/messages/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedMessages = data.messages.map((message) => {
            return {
              ...message,
              date: new Date(message.date).toISOString().split("T")[0],
            };
          });
          setMessages(formattedMessages);
        });
    }
  }, [id]);

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
      <Messages data={messages} />
    </main>
  );
}
