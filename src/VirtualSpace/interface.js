import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./chat.module.css";

function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  

  return (
    <div className={styles["chat-window"]}>
      <div className={styles["chat-header"]}>
        <p>Live Chat</p>
      </div>
      <div className={styles["chat-body"]}>
        <ScrollToBottom className={styles["message-container"]}>
          {messageList.map((messageContent, index) => {
            return (
              <div
                className={styles["message"]}
                id={username === messageContent.author ? "you" : "other"}
                key={index}
              >
                <div>
                  <div className={styles["message-content"]}>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className={styles["message-meta"]}>
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className={styles["chat-footer"]}>
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;