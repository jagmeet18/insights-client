import axios from "axios"

export async function getVSData({ roomIsNew, roomIdentifier, userId, setData }) {
	console.log(`${roomIsNew ? "Creating new" : "Retrieving existing"} virtual space data with the following params:`)
	const options = {
        // `?USER_ID=${userId}&ROOM_ID=${roomIdentifier}`
		url: `http://localhost:3000/vs${!roomIsNew ? "?USER_ID=" + userId + "&ROOM_ID=" + roomIdentifier : ""}`,
		method: roomIsNew ? "POST" : "GET",
		...(roomIsNew && {
            data: {
                USER_ID: userId,
				ROOM_NAME: roomIdentifier,
			},
		}),
	}
    console.table({...options})

	try {
		const response = await axios(options)
		// const response = { data: options }
		response && console.log("Got data:", response)
		setData(response.data)
	} catch (err) {
		console.error("Error while fetching virtual space data: ", err)
	}
}
