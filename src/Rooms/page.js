import { useState } from "react"
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from '../context/user'
import AppBar from '../AppBar/bar'
import CreateRoomPopup from "./create.room.popup";
import JoinRoomPopup from "./join.room.popup";
import { AppBarButtons } from "./appbar.buttons";

export default function Rooms () {
	const [appBarStatus, setAppBarStatus] = useState(null);
	const { userData } = useUser()
	const history = useHistory()
	console.log("Rooms component - context:", userData)

	function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
		setAppBarStatus(val)
	}

	const handleJoinOldRoom = async (e) => {
		e.preventDefault()
		const roomId = e.target.value;
		console.clear()
		const room = (await getDoc(doc(db, "virtual-spaces", roomId))).data()
		console.clear()
		history.push(`/app/vs/${roomId}`) //uncomment when vs room done
	}

	return (
		<>
			<AppBar onClickHandler={onStatusChange} buttons={AppBarButtons} />
			{
				appBarStatus === "create-new-room" ? <CreateRoomPopup /> : (
					appBarStatus === "join-new-room" && <JoinRoomPopup />
				)
			}
			<div>
				{
					userData.data.previousRooms && userData.data.previousRooms.map((roomId, index) => {
						return (
							<button key={index} value={roomId} onClick={handleJoinOldRoom}>{roomId}</button>
						)
					})
				}
			</div>
		</>
	)
}
