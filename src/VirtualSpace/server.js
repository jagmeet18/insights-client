import axios from "axios"

export async function getVSData(formState, { userId, roomId, roomName }, setData) {
    if (formState === "CREATE") { 
        
        return
    }
    if (formState === "JOIN") { 

        return
    }
	// const roomIsNew = formState === "CREATE"
	// console.log(`${roomIsNew ? "Creating new" : "Retrieving existing"} virtual space data`)
	// const options = {
	// 	// `?USER_ID=${userId}&ROOM_ID=${roomIdentifier}`
	// 	url: `http://localhost:3000/vs${!roomIsNew ? "?USER_ID=" + userId + "&ROOM_ID=" + roomIdentifier : ""}`,
	// 	method: roomIsNew ? "POST" : "GET",
	// 	...(roomIsNew && {
	// 		data: {
	// 			USER_ID: userId,
	// 			ROOM_NAME: roomIdentifier,
	// 		},
	// 	}),
	// 	cancelToken,
	// }
	// // console.table({...options})

	// try {
	// 	const response = await axios(options)
	// 	// const response = { data: options }
	// 	// response && console.log("Got data:", response)
	// 	setData(response.data)
	// } catch (err) {
	// 	axios.isCancel(err) && console.log("Request succesfully cancelled")
	// 	console.error("Error while fetching virtual space data: ", err)
	// }
}
