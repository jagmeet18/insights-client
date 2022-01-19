import React, { useEffect, useState, useCallback } from "react"
// import { Switch, Route, Redirect } from "react-router-dom"
import TextEditor from "./TextEditor"
import VirtualSpaces from "./VirtualSpaces"

export default function App() {
	const [userId, setUserId] = useState("qlQpFvVmJoV0LDGV5Zjr")
    const [roomData, setRoomData] = useState()
    
    console.log("App component re-rendered!")

    return <>{!roomData ? <VirtualSpaces setRoomData={setRoomData} userId={userId} /> : <TextEditor data={roomData} />}</>
}
