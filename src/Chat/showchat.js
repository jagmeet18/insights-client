import Chat from "./chat"
import styles from "./chat.module.css"
import io from "socket.io-client";
import React, { useEffect, useState } from "react";

const ShowChat = () => {
  const [socket, setSocket] = useState()
  
    useEffect(() => {
      const socket = io.connect("http://localhost:3001");
      setSocket(socket);
      return () => {
        socket.disconnect();
      };
    }, []);

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    
    const joinRoom = () => {
      if (username !== "" && room !== "") {
          socket.emit("join_room", room);
          setShowChat(true);
      }
    };

    return ( 
        <div className={styles["show-chat"]}>

           {/* {!showChat ? (
        <div className={styles["joinChatContainer"]}>
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : ( 
        )} */}
        <Chat socket={socket} username={"mahek"} room={"my room"} />
        </div>
     );
}

 
export default ShowChat;