import { useEffect, useState, useCallback } from "react"
import { getVSData } from "./server"

export default function VirtualSpaces(props) {
	const [roomId, setRoomId] = useState()
	const [roomName, setRoomName] = useState()
	const [data, setData] = useState()

	const { userId, setRoomData } = props

	console.log("Virtual Spaces component re-rendered!")

	useEffect(() => {
		console.log("Trying to set room data as:")
		console.table(data ? { ...data } : {undefined})
		if (!data) return
		setRoomData(data)
	}, [data, setRoomData])

	const fetchRoomData = useCallback(
		(roomIsNew, roomIdentifier) => {
			getVSData({
				roomIsNew,
				roomIdentifier,
				userId,
				setData,
			})
		},
		[userId]
	)

	const handleJoinRoom = (e) => {
		e.preventDefault()
		fetchRoomData(false, roomId)
	}

	const handleCreateRoom = (e) => {
		e.preventDefault()
		fetchRoomData(true, roomName)
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
							console.log("name: " + text)
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
							console.log("id: " + text)
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
