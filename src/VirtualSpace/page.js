import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { io } from "socket.io-client"
import { useUser } from "../user.context";
import AppBar from "../AppBar/bar"
import TextEditor from "./TextEditor"
import Chat from "../Chat/chat"
import Publish from "./publish.popup"
import { profiles } from "./profiles"
import styles from "./vspage.module.css"
import { faExpandAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const VirtualSpace = () => {
	const [socket, setSocket] = useState()
	const [publishupdate, setPublishupdate] = useState("Publish");
	const [published, setPublished] = useState(false);
	const [owners, setOwners] = useState([]);
	const { userData } = useUser()
	const { id: roomId } = useParams()
	const location = useLocation()


	useEffect(() => {
		/**
		 * For every owner id:
		 * - get the user's profile pic and name
		 */
		location.state.detail.owners.forEach((id) => { 
			try {
				// this is getting their passwords as well, maybe not a good idea
				getDoc(doc(db, "users", id)).then(async (snapshot) => { 
					const owner = snapshot.data()
					const { pfp, username } = owner
					setOwners([...owners, { pfp, id, username }])
				})
			} catch (error) {
				throw error
			}
		})

		const s = io("http://localhost:3000")
		setSocket(s)
		
		// // request the server to join the room
		s.emit("join-room", s.id, {
			pfp: userData.pfp,
			userId: userData.id,
			roomId,
		})
	
		// register handler for new users joining the room
		s.on('user-joined', (data) => {
			console.log("User joined: ", data)
			if (data.userId === userData.id) return
			setOwners((prev) => [...prev, { pfp: data.pfp, id: data.userId, username: data.username }])
		})

		// return () => {
		// 	s.disconnect()
		// }
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roomId])

	const expand = () => {
		// some css to expand text editor to full screen
	}

	const sendInvite = () => {
		// form to get invite id
	}

	const publish = () => {
		// publish the virtual space
		setPublishupdate("Update");
		setPublished(true);
		if(publishupdate === "Update") {
			alert("Yayy updated!")
		}
	}

    return (
		<>
			<AppBar/>
			<div className={styles["parent"]}>
				<div className={styles["text-editor"]}>
					{/* <TextEditor /> */}
				</div>

				<div className={styles["container"]}>	
					{published === true ? <Publish/> : null}
				</div>

				<div className={styles["publish-expand"]}>
					<button className={styles["publish-button"]} onClick={publish}>{publishupdate}</button>
					
					
					<button className={styles["expand-button"]} onClick={expand}>
						<FontAwesomeIcon className={styles["expand-icon"]} size="2x" icon={faExpandAlt}/>
					</button>
				</div>

				<div className={styles["online-collaborators"]}>				
					{owners.map(({ pfp, username }, index) => {
						return(	
							<img key={index} alt={`User ${username}`} className= {styles["images"]} src={pfp}/>
						);
					})}
					<button className={styles["invite-button"]} onClick={sendInvite}>
						<FontAwesomeIcon className={styles["invite-icon"]} size="3x" icon={faUserPlus}/>
					</button>
				</div>
				<div className={styles["chat"]}>
					{/* <Chat socket={socket} username={userData.username} room={roomId} /> */}
				</div>
			</div>
		</>
	)
}

export default VirtualSpace
