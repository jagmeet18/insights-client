import { useEffect, useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { getVSData } from "./server"
import axios from "axios"

export default function VirtualSpaces({ userId, setRoomData }) {
	const [roomId, setRoomId] = useState()
	const [formState, setFormState] = useState(null)
	const [roomName, setRoomName] = useState()
	const [data, setData] = useState()

	console.log("Virtual Spaces component rendered!")

	useEffect(() => {
		if (!data) return
		setRoomData(data)
	}, [data, setRoomData])

	useEffect(() => {
		if (!formState) return

		// if formState === "CREATE" : Name is provided and id needs to be generated
		// if formState === "JOIN" : No name is provided and id is provided
		getVSData(formState,{
			userId,
			roomId,
			roomName,
		}, setData)
		
	}, [formState, roomId, roomName, userId])

	const handleJoinRoom = (e) => {
		e.preventDefault()
		setFormState("JOIN")
	}

	const handleCreateRoom = (e) => {
		e.preventDefault()
		setRoomId(uuidv4())
		setFormState("CREATE")
	}

	return (
		<>
			<br></br>
			<form onSubmit={handleCreateRoom}>
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
			<form onSubmit={handleJoinRoom}>
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
