
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
// import VirtualSpace from "./VirtualSpace";
// import { Switch, Route } from "react-router-dom";
import { UserProvider } from "./user.context";

import ShowChat from "./Chat/showchat"

export default function App({ match, location, history }) {
  	//   const [userId] = useState("qlQpFvVmJoV0LDGV5Zjr");
  	//   const [activeRoom, setActiveRoom] = useState(null);
	return (

		<div className={styles.app}>
			<NavBar />
			<UserProvider query={location.search}>
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
		</div>

  	);

}
