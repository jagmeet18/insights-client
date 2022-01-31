import { useState } from "react"
// import { getVSData } from "../VirtualSpace/server"
// import axios from "axios"
import { useUser } from '../user.context'
import AppBar from '../AppBar/bar'
import CreateRoomPopup from "./create.room.popup";
import JoinRoomPopup from "./join.room.popup";
// import ShareRoomPopup from "./share.room.popup";
import { AppBarButtons } from "./appbar.buttons";

export default function Room () {
	const [appBarStatus, setAppBarStatus] = useState(null);
	const { userData } = useUser()
	console.log("Rooms component - context:",userData)

	function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
		console.log('appbar button clicked', val)
		setAppBarStatus(val)
	}
	// useEffect(() => {
	// 	if (!data) return
	// 	setRoomData(data)
	// }, [data, setRoomData])

	// useEffect(() => {
	// 	if (!formState) return

	// 	// if formState === "CREATE" : Name is provided and id needs to be generated
	// 	// if formState === "JOIN" : No name is provided and id is provided
	// 	getVSData(
	// 		formState,
	// 		{
	// 			userId,
	// 			roomId,
	// 			roomName,
	// 		},
	// 		setData
	// 	)
	// }, [formState, roomId, roomName, userId])

	const handleJoinOldRoom = (e) => {
		e.preventDefault()
		// history.push(`${match.path}/vs/${e.target.value}`) //uncomment when vs room done
	}

	return (
		userData.id ?
		<>
			<AppBar onClickHandler={onStatusChange} buttons={AppBarButtons} />
			{/* <div> */}
				{
					appBarStatus === "create-new-room" ? <CreateRoomPopup /> : (
						appBarStatus === "join-new-room" && <JoinRoomPopup />
					)
				}
			{/* </div> */}
			<div>
				{
					userData.previousRooms && userData.previousRooms.map((roomId, index) => { 
						return (
							<button key={index} value={roomId} onClick={handleJoinOldRoom}>{roomId}</button>
						)
					})
				}
			</div>
		</> : <h1 style={{padding:"50px"}}>Loading...</h1>
	)
}
