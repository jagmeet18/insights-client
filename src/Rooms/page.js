import { useEffect, useState, useCallback } from "react"
// import { getVSData } from "../VirtualSpace/server"
// import axios from "axios"
import { useUser } from '../user.context'
import AppBar from '../AppBar/bar'
import CreateRoomPopup from "./create.room.popup";
import JoinRoomPopup from "./join.room.popup";
import { AppBarButtons } from "./appbar.buttons";

export default function Rooms({ match, history }) {
	const [newRoomId, setNewRoomId] = useState("");
	const [newRoomName, setNewRoomName] = useState("");
	const [appBarStatus, setAppBarStatus] = useState(null);
	const hookdata = useUser()

	console.log('from room/page.js', hookdata)
	
	function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.value
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

	const handleJoinNewRoom = (e) => {
		e.preventDefault()
		// setFormState("JOIN")
	}

	const handleCreateNewRoom = (e) => {
		e.preventDefault()
		// setRoomId(uuidv4())
		// setFormState("CREATE")
	}

	const handleJoinOldRoom = (e) => {
		e.preventDefault()
	}

	return (
		<>
			<AppBar onClickHandler={onStatusChange} buttons={AppBarButtons} />
			<div>
				{
					appBarStatus === "create-new-room" ? <CreateRoomPopup /> : (
						appBarStatus === "join-new-room" && <JoinRoomPopup />
					)
				}
			</div>
			{/* <div style={{marginLeft: "125px"}}>
				<br></br>
				<h1>Create New Room</h1>
				<form onSubmit={handleCreateNewRoom}>
					<label>
						Room Name:
						<input
							type="text"
							onChange={(e) => {
								const text = e.target.value
								// console.log("name: " + text)
								setNewRoomName(text)
							}}
						/>
					</label>
					<input type="submit" value="Create Room" />
				</form>
				<br></br>
				<h1>Join New Room</h1>
				<form onSubmit={handleJoinNewRoom}>
					<label>
						Room ID:
						<input
							type="text"
							onChange={(e) => {
								const text = e.target.value
								// console.log("id: " + text)
								setNewRoomId(text)
							}}
						/>
					</label>
					<input type="submit" value="Join Room" />
				</form>
				<h1>Join Old Room</h1>
				{Rooms.map((room) => (
					<>
						<div>
							<button onClick={handleJoinOldRoom} value={room.id}>
								Join room: {room.name}
							</button>
						</div>
					</>
				))}
			</div> */}
			{/* // <Switch>
			// 	<Route path="/" exact>
			// 		<Redirect to={`/vs/create`} />
			// 	</Route>
			// 	<Route path="/:id" exact>
			// 		<Redirect to={`/vs/join/:id`} />
			// 	</Route>
			// 	<Route path="/vs/join/:id">
			// 		<TextEditor />
			// 	</Route>
			// 	<Route path="/vs/create">
			// 		<TextEditor />
			// 	</Route>
			// </Switch> */}
		</>
	)
}
