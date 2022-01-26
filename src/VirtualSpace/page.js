import React from "react"
// import TextEditor from "./TextEditor"
import AppBar from "../AppBar/bar"
import ShowChat from "../Chat/showchat"

const VirtualSpace = () => {
	
    return (
		<>
			{/* <p>:DDD:D:D:D:D:D</p>
			<div className="container">
				<div className="text-editor">

				</div>
				<div className="collaborators-online">
					<ul>

					</ul>
				</div>
			</div> */}
			<div className="chat">
				<ShowChat/>
			</div >
		</>
	)
}

export default VirtualSpace
