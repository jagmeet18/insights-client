import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import { joinRoom } from "./server"

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

const subscribeToFriendStatus = (cb) => cb(true)

const unsubscribeFromFriendStatus = (cb) => cb(false)

export default function TextEditor() {
	console.log("Mounting TextEditor...")
	const [isOnline, setIsOnline] = useState(null)

	useEffect(() => {
		function handleStatusChange(status) {
			setIsOnline(status.isOnline)
		}
		subscribeToFriendStatus(handleStatusChange)
		// Specify how to clean up after this effect:
		return function cleanup() {
			console.log("cleanup function")
			unsubscribeFromFriendStatus(handleStatusChange)
		}
	})

	if (isOnline === null) {
		return "Loading..."
	}
	return isOnline ? "Online" : "Offline"
}

// export default function TextEditor() {
// 	console.log("Mounting TextEditor...")
// 	const [count, setCount] = useState(0)

// 	// Similar to componentDidMount and componentDidUpdate:
// 	useEffect(() => {
// 		// Update the document title using the browser API
// 		document.title = `You clicked ${count} times`
// 		return () => {
// 			console.log("cleanup function")
// 		}
// 	})

// 	return (
// 		<div>
// 			<p>You clicked {count} times</p>
// 			<button onClick={() => setCount(count + 1)}>Click me</button>
// 		</div>
// 	)
// }

// export default function TextEditor() {
// 	const { id: roomId } = useParams()
// 	const [socket, setSocket] = useState()
// 	const [quill, setQuill] = useState()

// 	useEffect(() => {
// 		// if (socket == null || socket === undefined) return
//         // const url = "https://jsonplaceholder.typicode.com/posts"
//         const abortCtrl = new AbortController()
//         const userId = "qlQpFvVmJoV0LDGV5Zjr"

//         joinRoom({
//             quill,
// 			setSocket,
// 			io,
// 			userId,
// 			roomId,
// 			abortCtrl,
// 		})

// 		return () => {
// 			console.log("cleanup function")
//             socket.disconnect()
//             // abortCtrl.abort()
//         }
//     },[quill, roomId, socket])

//     // this inits a websocket connection w server
// 	//   useEffect(() => {
// 	//     const s = io("http://localhost:3001")
// 	//     setSocket(s)

// 	//     return () => {
// 	//       s.disconnect()
// 	//     }
// 	//   }, [])

//     // this requests collab data and sets it to quill when it arrives
// 	//   useEffect(() => {
// 	//     if (socket == null || quill == null) return

// 	//     socket.once("load-document", document => {
// 	//       quill.setContents(document)
// 	//       quill.enable()
// 	//     })

// 	//     socket.emit("get-document", documentId)
// 	//   }, [socket, quill, documentId])

//     // this updates the document when the server sends changes
// 	//   useEffect(() => {
// 	//     if (socket == null || quill == null) return

// 	//     const handler = delta => {
// 	//       quill.updateContents(delta)
// 	//     }
// 	//     socket.on("receive-changes", handler)

// 	//     return () => {
// 	//       socket.off("receive-changes", handler)
// 	//     }
// 	//   }, [socket, quill])

//     // this sends changes to the server everytime there is a change
// 	//   useEffect(() => {
// 	//     if (socket == null || quill == null) return

// 	//     const handler = (delta, oldDelta, source) => {
// 	//       if (source !== "user") return
// 	//       socket.emit("send-changes", delta)
// 	//     }
// 	//     quill.on("text-change", handler)

// 	//     return () => {
// 	//       quill.off("text-change", handler)
// 	//     }
// 	//   }, [socket, quill])

// 	const wrapperRef = useCallback((wrapper) => {
// 		if (wrapper == null) return

// 		wrapper.innerHTML = ""
// 		const editor = document.createElement("div")
// 		wrapper.append(editor)
// 		const q = new Quill(editor, {
// 			theme: "snow",
// 			modules: { toolbar: TOOLBAR_OPTIONS },
// 		})
// 		q.disable()
// 		q.setText("Loading...")
// 		setQuill(q)
// 	}, [])
//     return <div className="container" ref={wrapperRef}></div>
// }
