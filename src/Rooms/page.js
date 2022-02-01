import { useState } from "react"
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from '../user.context'
import AppBar from '../AppBar/bar'
import CreateRoomPopup from "./create.room.popup";
import JoinRoomPopup from "./join.room.popup";
import { AppBarButtons } from "./appbar.buttons";

export default function Rooms () {
	const [appBarStatus, setAppBarStatus] = useState(null);
	const { userData } = useUser()
	const history = useHistory()
	console.log("Rooms component - context:", userData)

	function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
		console.log('appbar button clicked', val)
		setAppBarStatus(val)
	}
	// useEffect(() => {
	// 	if (!data) return
	// 	setRoomData(data)
	// }, [data, setRoomData])

	// useEffect(() => {
	// 	if (!formState) return

	// 	// if formState === "CREATE" : Name is provided and id needs to be generated
	// 	// if formState === "JOIN" : No name is provided and id is provided
	// 	getVSData(
	// 		formState,
	// 		{
	// 			userId,
	// 			roomId,
	// 			roomName,
	// 		},
	// 		setData
	// 	)
	// }, [formState, roomId, roomName, userId])

	const handleJoinOldRoom = async (e) => {
		e.preventDefault()
		const roomId = e.target.value;
		console.clear()
		const room = (await getDoc(doc(db, "virtual-spaces", roomId))).data()
		history.push({pathname: `/app/vs/${roomId}`, state: { detail: room }}) //uncomment when vs room done
	}

	return (
		<>
			<AppBar onClickHandler={onStatusChange} buttons={AppBarButtons} />
			{
				userData.id ?
				<>
					{
						appBarStatus === "create-new-room" ? <CreateRoomPopup /> : (
							appBarStatus === "join-new-room" && <JoinRoomPopup />
						)
					}
					<div>
						{
							userData.data.previousRooms && userData.data.previousRooms.map((roomId, index) => {
								return (
									<button key={index} value={roomId} onClick={handleJoinOldRoom}>{roomId}</button>
								)
							})
						}
					</div>
				</> : <h1 style={{ padding: "50px" }}>Loading...</h1>
			}
		</>
	)
}
