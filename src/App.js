import React, { useState } from "react"
// import { Switch, Route, Redirect } from "react-router-dom"
import TextEditor from "./TextEditor"
import VirtualSpaces from "./VirtualSpaces"
import Navbar from "./BarComp/Navbar/Navbar"
import Sidebar from "./BarComp/Sidebar/Sidebar"
import Profile from './Profile';
import "./App.css"
import { CollabsList, CommunitiesList } from "./DummyData"
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

