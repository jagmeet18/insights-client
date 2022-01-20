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

export default function TextEditor({ data }) {
	const [socket, setSocket] = useState()
	const [quill, setQuill] = useState()

	console.log("Text Editor component rendered!")

	// useEffect(() => {
	// 	const s = io("http://localhost:3000")
	// 	const close = (s) => s.close()
	// 	window.onbeforeunload = (e) => close(s)
	// 	window.addEventListener("beforeunload", (e) => close(s))
	// 	return () => {
	// 		window.removeEventListener("beforeunload", (e) => close(s))
	// 		window.onbeforeunload = null
	// 		close(s)
	// 	}
	// })

	useEffect(() => {
		console.log("Attempting to populate document...")
		console.log("Quill: ", quill)
		console.log("Data: ", data.collab)
		if (!data.collab || !quill) return
		const documentData = data.collab.content.arrayValue.values
		quill.setContents(documentData)
		quill.enable()
		return () => {
			console.log("Document cleanup...")
			console.log("Quill during cleanup: ", quill)
			if (!quill) return
			quill.deleteText(0, quill.getLength())
			quill.disable()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		/**
		 * We want to repopulate the document if the collab content
		 * was changed before the last render.
		 */
		data.collab.content.arrayValue.values,
		/**
		 * We want to repopulate the document if the quill instance
		 * was changed before the last render.
		 */
		quill,
	])

	// this inits a websocket connection w server
	useEffect(() => {
	    if (!data) return
		const s = io("http://localhost:3000")
		setSocket(s)
		s.emit("join-room", {
			userId: data.room.id,
			roomId: data.room.id,
		})
	}, [data])

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
	// useEffect(() => {
	// 	if (socket == null || quill == null) return

	// 	const handler = (delta) => {
	// 		quill.updateContents(delta)
	// 	}
	// 	socket.on("receive-changes", handler)

	// 	return () => {
	// 		socket.off("receive-changes", handler)
	// 	}
	// }, [socket, quill])

	// this sends changes to the server everytime there is a change
	// useEffect(() => {
	// 	if (socket == null || quill == null) return

	// 	const handler = (delta, oldDelta, source) => {
	// 		if (source !== "user") return
	// 		socket.emit("send-changes", delta)
	// 	}
	// 	quill.on("text-change", handler)

	// 	return () => {
	// 		quill.off("text-change", handler)
	// 	}
	// }, [socket, quill])

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
