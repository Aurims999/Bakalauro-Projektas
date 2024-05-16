import { useState, useEffect } from "react";

import Message from "./Message";
import NoData from "../Others/Error-Handling/NoData/NoData";

import "./messages.css";

export default function Messages({ data }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  return (
    <div className="messages-table dataTable">
      {messages && messages.length > 0 ? (
        <div className="messages-table-container">
          <div className="messages-table-header">
            <div></div>
            <h2>Date</h2>
            <h2>Title</h2>
            <h2>Message</h2>
          </div>
          <div className="messages-table-content">
            {messages.map((message) => {
              return (
                <Message
                  img={message.banner}
                  date={message.date}
                  title={message.title}
                  message={message.text}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="tableContainer noComments">
          <NoData
            icon={"/icons/mailbox-purple.png"}
            text={"You currently have no messages"}
          />
        </div>
      )}
    </div>
  );
}
