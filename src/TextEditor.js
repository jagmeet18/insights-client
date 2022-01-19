import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"

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

// function unloadOnEditorHandler(socket, setSocket, register) {
// 	window.onbeforeunload = register
// 		? function () {
// 				console.log("Disconnecting socket before unload")
// 				socket.disconnect()
// 				setSocket(socket)
// 		  }
// 		: null
// }

export default function TextEditor({ data }) {
	const [socket, setSocket] = useState()
	const [quill, setQuill] = useState()

	console.log("Text Editor component re-rendered!")

	useEffect(() => {
		console.log("Attempting to initialize Quill with data: ", data)
		if (!data || !quill) return
		const documentData = data.collab.content.arrayValue.values
		quill.setContents(documentData)
		quill.enable()
	}, [data, quill])

	// this inits a websocket connection w server
	useEffect(() => {
		console.log("Attempting to establish Websocket connection [data: ", data, "]")
		if (!data) return
		const s = io("http://localhost:3000")
		s && console.log("Websocket connection established succesfully: ", s)
		setSocket(s)

		function unloadOnEditorHandler(event) { 
			const e = event || window.event
			if (e) {
				e.preventDefault()
				e.returnValue = ""
			}
			s.disconnect()
			setSocket(s)
			return ""
		}

		window.onbeforeunload = unloadOnEditorHandler
		window.addEventListener("beforeunload", unloadOnEditorHandler)
		// unloadOnEditorHandler(s, true)

		return () => {
			// unloadOnEditorHandler(s, setSocket, false)
			console.log("Socket cleanup function")
			s.disconnect()
			setSocket(s)
		}
	}, [socket, data])

	// this requests collab data and sets it to quill when it arrives
	//   useEffect(() => {
	//     if (socket == null || quill == null) return

	//     socket.once("load-document", document => {
	//       quill.setContents(document)
	//       quill.enable()
	//     })

	//     socket.emit("get-document", documentId)
	//   }, [socket, quill, documentId])

	// this updates the document when the server sends changes
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

	// this sends changes to the server everytime there is a change
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

	const quillInitializerRef = useCallback((containerDiv) => {
		if (containerDiv == null) return

		containerDiv.innerHTML = ""
		const editorDiv = document.createElement("div")
		containerDiv.append(editorDiv)
		const q = new Quill(editorDiv, {
			theme: "snow",
			modules: { toolbar: TOOLBAR_OPTIONS },
		})
		q.disable()
		q.setText("Loading...")
		setQuill(q)
	}, [])
	return <div className="container" ref={quillInitializerRef}></div>
}
