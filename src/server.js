import axios from "axios"

export async function joinRoom({ userId, roomId, quill, setSocket, io }) {
	console.log(`Joining ${roomId ? "an old" : "a new"} virtual space...`)
    const methodisGet = roomId ? true : false
    const url = methodisGet ? `http://localhost:3000/vs?USER_ID=${userId}&ROOM_ID=${roomId}` : `http://localhost:3000/vs`
	const options = {
		url,
		method: methodisGet ? "GET" : "POST",
		...(!methodisGet && {
			data: {
				USER_ID: userId,
				ROOM_NAME: "FIRST REACT ROOM",
			},
		}),
    }

	try {
		const response = await axios(options)
        console.log(response)
        setSocket(io(url))
	} catch (err) {
		console.error(`Error while fetching: ${err}`)
	}
}
