import React, { useState, useEffect } from "react"
import {
	useParams,
	// useLocation
} from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { io } from "socket.io-client"
import { useUser } from "../context/user";
import AppBar from "../AppBar/bar"
import TextEditor from "./text.editor"
// import Chat from "../Chat/chat"
import Publish from "./publish.popup"
import styles from "./vspage.module.css"
import { faExpandAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const VirtualSpace = () => {
	const [socket, setSocket] = useState()
	const [published, setPublished] = useState(null);
	const [publishFormVisible, setPublishFormVisible] = useState(false);
	const [collabId, setCollabId] = useState();

	const { userData } = useUser()
	const { id: userId } = userData
	const [participants, setParticipants] = useState([{pfp: userData.data?.pfp, username: userData.data?.username, userId}]);
	const { id: roomId } = useParams()

	useEffect(() => {
		getDoc(doc(db, "virtual-spaces", roomId)).then(docSnap => {
			// eslint-disable-next-line no-throw-literal
			if (!docSnap.data()) throw {code:404, msg:"Room doesn't exist"}
			const collabId = docSnap.data().collabId
			setCollabId(collabId)
		})
	}, [roomId]);

	// updates state when received from context
	useEffect(() => {
		const i = participants.findIndex(user => user.userId === userId)
		if (i === -1) return
		setParticipants((prev) => { 
			prev[i].pfp = userData.data?.pfp
			prev[i].username = userData.data?.username
			return prev
		})
	}, [userData.data?.pfp, userData.data?.username, userId]);

	useEffect(() => {
		if (!collabId) return
		
		const s = io("http://localhost:3000")
		setSocket(s)

		// data received upon joining the room
		s.on("join-room ack", ({userId: uid , username: uname}) => {
			console.log("Data from user: ", uname)
			getDoc(doc(db, "users", uid)).then((snapshot) => {
				const { pfp } = snapshot.data()
				setParticipants((prev) => [...prev, { pfp, userId: uid, username: uname }])
			})
		})
	
		// data received when a new user joins the room
		s.on('user-joined', (socketid, { userId: uid, username: uname }) => {
			console.log("User joined: ", uname)
			// acknowledge that the user has joined the room
			s.emit("user-joined ack", socketid, {
				userId,
				username: userData.data?.username
			})
			// get the newly joined user's pfp from firebase and then add it to the list of owners
			getDoc(doc(db, "users", uid)).then((snapshot) => {
				const { pfp } = snapshot.data()
				setParticipants((prev) => [...prev, { pfp, userId: uid, username: uname }])
			})
		})

		s.on('user-disconnected', (data) => {
			console.log("User disconnected: ", data.username)
			setParticipants((prev) => prev.filter((p) => p.userId !== data.userId))
		})

		// request the server to join the room
		s.emit("join-room", {
			userId,
			username: userData.data?.username,
			collabId,
			roomId
		})

		return () => {
			if (!collabId) return
			s.disconnect()
			console.log("Disconnected from Virtual Space")
		}
		
	}, [collabId, roomId, userData.data?.username, userId])

	const expand = () => {
		// some css to expand text editor to full screen
	}

	const sendInvite = () => {
		// form to get invite id
	}

	const showForm = (e) => { 
		setPublishFormVisible(true)
	}

	const hideForm = (e) => { 
		setPublishFormVisible(false)
	}

	const filterByPublishStatus = (x,y,z) => { 
		if (published === true) return x
		if (published === false) return y
		if (published === null) return z
	}

    return (
		<>
			{publishFormVisible && <Publish onSubmit={(e) => { hideForm(e); setPublished(true) }} collabId={collabId} onCancel={hideForm}/>}
			<AppBar style={{ border: "2px solid green", position: "sticky", top: 0 }}/>
			<div className={styles["parent"]}>
				<div className={styles["text-editor"]}>
					<TextEditor onDocumentLoad={setPublished} roomId={roomId} collabId={collabId} socket={socket} />
				</div>

				<div className={styles["publish-expand"]}>
					<div
						className={ filterByPublishStatus(styles["publish-button-published"], styles["publish-button-not-published"], styles["publish-button-not-published"]) }
						onClick={filterByPublishStatus(() => { }, showForm, () => { })}>
						<p>{filterByPublishStatus("Succesfully published!","Publish","Checking...")}</p>
					</div>
					<button className={styles["expand-button"]} onClick={expand}>
						<FontAwesomeIcon className={styles["expand-icon"]} size="2x" icon={faExpandAlt}/>
					</button>
				</div>

				<div className={styles["online-collaborators"]}>				
					{participants.map(({ pfp, username }, index) => {
						if (!pfp || !username) return undefined
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
