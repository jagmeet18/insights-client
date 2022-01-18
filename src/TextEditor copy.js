import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: "ordered" }, { list: "bullet" }],
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }],
	[{ script: "sub" }, { script: "super" }],
	[{ align: [] }],
	["blockquote", "code-block"],
	["clean"],
]

function joinRoom(options) {
	// eslint-disable-next-line no-unused-vars
	let { url, abortCtrl, userId, roomId, quill, setSocket } = options

	// eslint-disable-next-line no-unused-vars
	const fetchOptions = {
        signal: abortCtrl.signal,
        method: roomId ? "GET" : "POST",
		body: JSON.stringify({
			USER_ID: userId,
			ROOM_ID: roomId,
			...(roomId ? { ROOM_ID: roomId } : { ROOM_NAME: "FIRST REACT ROOM" }),
		}),
	}
    console.log(`Joining ${roomId ? "an old" : "a new"} virtual space...`)
    console.log(fetchOptions)
	fetch(`${url}/vs`, fetchOptions)
		.catch((err) => {
			throw err
		})
		.then(JSON.parse)
		.then((res) => {
			console.log("Virtual Space & Collab data received succesfully...")
			console.log("Initializing Websocket connection with insights-server...")
			setSocket(io(url))
			console.log("Websocket connection established succesfully...")
			quill.setContents(res.data.collab.content.arrayValue.values)
			quill.enable()
		})
}

export default function TextEditor() {
	const { id: roomId } = useParams()
	const [socket, setSocket] = useState()
	const [quill, setQuill] = useState()
	// const [VSData, setVSData] = useState()
	// const [collabData, setCollabData] = useState()

    useEffect(() => {
        if (quill == null) return

		const url = "http://localhost:3000"
		const abortCtrl = new AbortController()
		const userId = "qlQpFvVmJoV0LDGV5Zjr"

		joinRoom({
			url,
			abortCtrl,
			userId,
			roomId,
			quill,
			setSocket,
		})

		return () => {
			abortCtrl.abort()
			// socket.disconnect()
		}
	}, [quill, roomId, socket])

	// useEffect(() => {
	//   if (socket == null || quill == null) return

	//   socket.once("load-document", document => {
	//     quill.setContents(document)
	//     quill.enable()
	//   })

	//   socket.emit("get-document", documentId)
	// }, [socket, quill, documentId])

	// useEffect(() => {
	//   if (socket == null || quill == null) return

	//   const interval = setInterval(() => {
	//     socket.emit("save-document", quill.getContents())
	//   }, SAVE_INTERVAL_MS)

	//   return () => {
	//     clearInterval(interval)
	//   }
	// }, [socket, quill])

	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = (delta) => {
			quill.updateContents(delta)
		}
		socket.on("receive-changes", handler)

		return () => {
			socket.off("receive-changes", handler)
		}
	}, [socket, quill])

	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = (delta, oldDelta, source) => {
            if (source !== "user") return
			socket.emit("send-changes", delta)
		}
		quill.on("text-change", handler)

		return () => {
			quill.off("text-change", handler)
		}
	}, [socket, quill])

	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return

		wrapper.innerHTML = ""
		const editor = document.createElement("div")
		wrapper.append(editor)
		const q = new Quill(editor, {
			theme: "snow",
			modules: { toolbar: TOOLBAR_OPTIONS },
        })
		q.disable()
		q.setText("Loading...")
		setQuill(q)
    }, [])
    
	return <div className="container" ref={wrapperRef}></div>
}
