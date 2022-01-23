import { useEffect, useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { getVSData } from "./server"
// import axios from "axios"

export default function Rooms({ roomList, setRoomData }) {
	// const [roomId, setRoomId] = useState()
	// const [formState, setFormState] = useState(null)
	// const [roomName, setRoomName] = useState()
	// const [data, setData] = useState()

	console.log("Rooms component rendered!")

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
		setRoomData((data) => ({
			
		}))
	}

	return (
		<>
			<br></br>
			<form onSubmit={handleCreateNewRoom}>
				<label>
					Room Name:
					<input
						type="text"
						onChange={(e) => {
							const text = e.target.value
							// console.log("name: " + text)
							setRoomName(text)
						}}
					/>
				</label>
				<input type="submit" value="Create Room" />
			</form>
			<br></br>
			<form onSubmit={handleJoinNewRoom}>
				<label>
					Room ID:
					<input
						type="text"
						onChange={(e) => {
							const text = e.target.value
							// console.log("id: " + text)
							setRoomId(text)
						}}
					/>
				</label>
				<input type="submit" value="Join Room" />
			</form>
			{roomList.map((room) => (
				<>
					<br></br>
					<div>
						<button onClick={handleJoinOldRoom} value={room.id}>
							Join {room.name}
						</button>
					</div>
				</>
			))}
		</>
		// <Switch>
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
		// </Switch>
	)
}
