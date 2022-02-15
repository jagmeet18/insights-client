import { useCallback, useEffect, useState } from "react"
// import debounce from 'lodash.debounce'
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import Quill from "quill"
import QuillCursors from 'quill-cursors';
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

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function TextEditor({ onMembersChange, socket, roomId, collabId, onDocumentLoad }) {
	const [quill, setQuill] = useState()
	const [cursorsModule, setCursorsModule] = useState()

	console.log(" Text Editor Component rendered!")
	
	// this requests collab data and sets it to quill when it arrives
	useEffect(() => {
	if (socket == null || quill == null) return

		socket.once("load-document", ({ content, published }) => {
		onDocumentLoad(published)
		quill.setContents(content)
		quill.enable()
	})

	// socket.emit("get-document", roomId)
	}, [socket, quill, onDocumentLoad])
	
	// re-calculates everyones cursor whenever someone leaves or joins
	// useEffect(() => { 
	// 	if (!cursorsModule) return
	// 	onMembersChange((participants) => {
	// 		const nUsers = participants.length
	// 		if (nUsers === 1) return
	// 		participants.forEach((user) => {
	// 			cursorsModule.clearCursors()
	// 			const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
	// 			const cursor = cursorsModule.createCursor(user.userId, user.username, color)
	// 		})
	// 		// const newUser = participants[nUsers - 1]
	// 		// console.log('new user in text editor: ', participants, participants.length)
	// 		// console.log('Cursor created: ', cursor)
	// 	})
	// },[cursorsModule, onMembersChange])


	// useEffect(() => {
	// 	if (!quill) return
	// 	quill.on('selection-change', debounce(function (range, oldRange, source) {
	// 		if (!range) return console.log(source+' cursor not in the editor')
	// 		if (range.length === 0) {
	// 			console.log(source+' cursor is on', range.index);
	// 		} else {
	// 			const text = quill.getText(range.index, range.length);
	// 			console.log(source+' has highlighted', text);
	// 		}
	// 	}, 600))
	// },[quill])

	// this updates the document when the server sends changes
	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = (delta) => {
			console.log(delta)
			quill.updateContents(delta)
		}
		socket.on("receive-changes", handler)

		return () => {
			socket.off("receive-changes", handler)
		}
	}, [socket, quill])

	const saveCollabDebounced = debounce(async () => { 
		if (!collabId) return
		// await updateDoc(doc(db, "collabs", collabId), { content: quill.getContents().ops })
		console.log("saved document ["+collabId+"]")
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
	}, [socket, quill, collabId, saveCollabDebounced])

	const quillInitializerRef = useCallback((containerDiv) => {
		if (containerDiv == null) return

		containerDiv.innerHTML = ""
		const editorDiv = document.createElement("div")
		containerDiv.append(editorDiv)
		Quill.register('modules/cursors', QuillCursors);
		const q = new Quill(editorDiv, {
			theme: "snow",
			modules: { toolbar: TOOLBAR_OPTIONS, cursors: true },
		})
		q.disable()
		q.setText("Loading...")
		const cursorsModule = q.getModule('cursors')
		setCursorsModule(cursorsModule)
		setQuill(q)
	}, [])

	return <div className="container" ref={quillInitializerRef}></div>
}
