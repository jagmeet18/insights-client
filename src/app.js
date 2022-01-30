import React, { useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import styles from './app.module.css'
// import TextEditor from "./TextEditor";
// import VirtualSpaces from "./VirtualSpaces";
// import AppBar from "./AppBar/AppBar";
import NavBar from "./NavBar/bar";
import Profile from "./Profile/page";
// import "./App.css";
// import { CollabsList, CommunitiesList } from "./DummyData";
import Rooms from "./Rooms/page";
import VirtualSpace from "./VirtualSpace/page";
// import VirtualSpace from "./VirtualSpace";
// import { Switch, Route } from "react-router-dom";
import { UserProvider } from "./user.context";

import Publish from "./publishform"
import ShowChat from "./Chat/showchat"






export default function App({ match, location, history }) {
  const [queries, setQueries] = useState(location.search);
  	//   const [userId] = useState("qlQpFvVmJoV0LDGV5Zjr");

  	//   const [activeRoom, setActiveRoom] = useState(null);
	useEffect(() => {
		if (queries == '') {
			setQueries(localStorage.getItem('userId'))
		}
	}, []);


	console.log("went through app component", queries)
		
	return (


		<div className={styles.app}>
			<NavBar />
			{
				queries &&
				<UserProvider query={queries}>
				<div className={styles.page}>
					<Route exact path={`${match.path}/`}>
						<Redirect to={`${match.path}/rooms`} />
					</Route>
					<Route path={`${match.path}/profile`}>
						<Profile />
					</Route>
					<Route path={`${match.path}/rooms`}>
						<Rooms />
					</Route>
					<Route path={`${match.path}/vs/:id`}>
						{/* <Rooms /> */}
						{/* <Publish /> */}
						<VirtualSpace />
					</Route>
					{/* <Route path={`${match.path}/publishform`}>
						<Publish/>
					</Route> */}
				</div>
				{/* <Route path="/rooms" exact>
					<Rooms
					roomList={roomList}
					setRoomData={setActiveRoom}
					userId={userId}
					/>
				</Route>
				<Route>
					<VirtualSpace data={activeRoom} />
				</Route> */}

				</UserProvider>
			}
		</div>


  	);

}
