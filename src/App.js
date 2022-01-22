import React, { useState } from "react"
// import { Switch, Route, Redirect } from "react-router-dom"
import TextEditor from "./TextEditor"
import VirtualSpaces from "./VirtualSpaces"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import "./App.css"

export default function App() {
	const [userId] = useState("qlQpFvVmJoV0LDGV5Zjr")
    const [roomData, setRoomData] = useState()
    
    console.log("App component rendered!")

    return (
		<>
			{
				!roomData ? <VirtualSpaces setRoomData={setRoomData} userId={userId} /> : <TextEditor data={roomData} />
			}
		</>
	)
}
