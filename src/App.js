import React, { useState } from "react"
// import { Switch, Route, Redirect } from "react-router-dom"
import TextEditor from "./TextEditor"
import VirtualSpaces from "./VirtualSpaces"

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
