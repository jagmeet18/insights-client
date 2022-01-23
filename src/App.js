import React, { useState } from "react"
// import { Switch, Route, Redirect } from "react-router-dom"
import TextEditor from "./TextEditor"
import VirtualSpaces from "./VirtualSpaces"
import Navbar from "./BarComp/Navbar/Navbar"
import Sidebar from "./BarComp/Sidebar/Sidebar"
import Profile from './Profile';
import "./App.css"
import { CollabsList, CommunitiesList } from "./DummyData"
import ShowChat from "./ShowChat"




export default function App() {
	// const [userId] = useState("qlQpFvVmJoV0LDGV5Zjr")
    // const [roomData, setRoomData] = useState()
    
    // console.log("App component rendered!")

    return (	
		
		<>

			<ShowChat/>

			{/* {
				!roomData ? <VirtualSpaces setRoomData={setRoomData} userId={userId} /> : <TextEditor data={roomData} />
			} */}
			{/*<Profile img="https://www.westernunion.com/content/dam/wu/jm/responsive/send-money-in-person-from-jamaica-resp.png"
			userName="Alex" collabsList={CollabsList} communitiesList={CommunitiesList}/>*/}



		
		
		
		
		</>
	)
}

