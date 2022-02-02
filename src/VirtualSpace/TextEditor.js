import { useCallback, useEffect, useState } from "react"
import debounce from 'lodash.debounce'
import { getDoc, setDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import "./text.editor.css"

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

export default function TextEditor({ socket: s, roomId }) {
	const [socket, setSocket] = useState(s)
	const [collabId, setCollabId] = useState(null);
	const [quill, setQuill] = useState()

	console.log("Text Editor component rendered!")
	
	useEffect(() => {
		getDoc(doc(db, "virtual-spaces", roomId)).then(snap => { 
			const { collabId } = snap.data()
			setCollabId(collabId)
		})
	}, [roomId]);

	// useEffect(() => {
	// 	console.log("Attempting to populate document...")
	// 	console.log("Quill: ", quill)
	// 	if (!quill) return
		// getDoc(doc(db, "virtual-spaces", roomId)).then(snap => { 
		// 	const { collabId } = snap.data()
		// 	getDoc(doc(db, "collabs", collabId)).then(snap => { 
		// 		const { content } = snap.data()
		// 		quill.setContents(content)
		// 		quill.enable()
		// 	})
		// });
	// 	return () => {
	// 		console.log("Document cleanup...")
	// 		if (!quill) return
	// 		quill.deleteText(0, quill.getLength())
	// 		quill.disable()
	// 	}
	
	// }, [quill, roomId])

	// this inits a websocket connection w server
	// useEffect(() => {
	//     if (!data) return
	// 	const s = io("http://localhost:3000")
	// 	setSocket(s)
	// 	s.emit("join-room", {
	// 		userId: data.room.id,
	// 		roomId: data.room.id,
	// 	})
	// }, [data])
	
	// this requests collab data and sets it to quill when it arrives
	  useEffect(() => {
	    if (socket == null || quill == null) return

		  socket.once("load-document", document => {
	      	quill.setContents(document)
	      	quill.enable()
	    })

	    // socket.emit("get-document", roomId)
	  }, [socket, quill, roomId])
	
	// useEffect(() => {
		// getDoc(doc(db, "virtual-spaces", roomId)).then(snap => { 
		// 	const { collabId } = snap.data()
		// });
	// 	const interval_id = setInterval(() => {
	// 		console.log("Interval...")
	// 		if (!quill ) return
	// 		console.log("old contents and new contents the same? ", contents.current.ops , quill.getContents().ops)
	// 		contents.current = quill.getContents()
			// setDoc(doc(db, "collabs", collabId), quill.getContents())
	// 	},3000)
	
	// 	return () => {
	// 		console.log("Clearing interval with id: ", interval_id)
	// 		clearInterval(interval_id)
	// 	};
	// }, [quill, roomId]);

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

	const saveCollabDebounced = debounce(async () => { 
		if (!collabId) return
		const data = await setDoc(doc(db, "collabs", collabId), { content: quill.getContents().ops })
		console.log("saving document ["+collabId+"]: ", data)
	}, 1000)

	// this sends changes to the server everytime there is a change
	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = async (delta, oldDelta, source) => {
			if (source !== "user") return
			socket.emit("send-changes", delta, { roomId })
			saveCollabDebounced()
			// setDoc(doc(db, "collabs", collabId), quill.getContents())
		}
		quill.on("text-change", handler)

		return () => {
			quill.off("text-change", handler)
		}
	}, [socket, quill, roomId, saveCollabDebounced])

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
