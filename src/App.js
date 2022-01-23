import { useState } from "react"
import Rooms from "./Rooms"
import VirtualSpace from "./VirtualSpace"
import { Switch, Route } from "react-router-dom"

let roomList = []

export default function App() {
	const [userId] = useState("qlQpFvVmJoV0LDGV5Zjr")
	const [activeRoom, setActiveRoom] = useState(null)
	return (
		<Switch>
			<Route path="/rooms" exact>
				<Rooms roomList={roomList} setRoomData={setActiveRoom} userId={userId} />
			</Route>
			<Route>
				<VirtualSpace data={activeRoom} />
			</Route>
		</Switch>
	)
}
