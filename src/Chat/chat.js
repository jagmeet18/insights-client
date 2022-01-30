import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./chat.module.css";


function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }
      console.log(messageData)

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("")
      await socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
    }
  };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageList((list) => [...list, data]);
  //   });
  // }, [socket]);

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
          value={currentMessage}
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