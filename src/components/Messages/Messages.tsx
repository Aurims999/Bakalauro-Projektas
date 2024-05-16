import { useState, useEffect } from "react";

import Message from "./Message";
import NoData from "../Others/Error-Handling/NoData/NoData";

import "./messages.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="messages-container dataTable">
      <div
        className={`tableContainer ${
          !messages || messages.length === 1 ? "noComments" : ""
        }`}
      >
        {messages && messages.length > -1 ? (
          <>
            <div className="table-header">
              <div></div>
              <h2>Date</h2>
              <h2>Title</h2>
              <h2>Message</h2>
            </div>
            <div className="table-content">
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
          </>
        ) : (
          <NoData
            icon={"/icons/mailbox-purple.png"}
            text={"You currently have no messages"}
          />
        )}
      </div>
    </div>
  );
}
