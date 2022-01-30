import React from "react"
// import TextEditor from "./TextEditor"
import AppBar from "../AppBar/bar"
import ShowChat from "../Chat/showchat"
import { profiles } from "./profiles"
import styles from "./vspage.module.css"
import { faExpandAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Publish from "../publishform"

import { Link } from "react-router-dom";

import { useState } from "react";




const expand = () => {
	// some css to expand text editor to full screen
}

const sendInvite = () => {
	// form to get invite id
}

// const publish = () => {
// 	// publish the virtual space
// 	<Publish/>
// 	console.log("hi")
// 	setPublishupdate("Update");

// }


const VirtualSpace = () => {
	const [publishupdate, setPublishupdate] = useState("Publish");
	const [published, setPublished] = useState(false);

	const publish = () => {
		// publish the virtual space
		console.log("hi")
		setPublishupdate("Update");
		setPublished(true);
		if(publishupdate == "Update") {
			alert("Yayy updated!")
		}
	
	}
    return (
		<>
			<AppBar/>
			<div className={styles["parent"]}>
				<div className={styles["text-editor"]}>

				<div className={styles["container"]}>	
					{published === true ? <Publish/> : null}
				</div>

				</div>

				<div className={styles["publish-expand"]}>
					<button className={styles["publish-button"]} onClick={publish}>{publishupdate}</button>
					
					
					<button className={styles["expand-button"]} onClick={expand}>
						<FontAwesomeIcon className={styles["expand-icon"]} size="2x" icon={faExpandAlt}/>
					</button>
				</div>

				<div className={styles["online-collaborators"]}>					
						{profiles.map((user,index) => {
							return(	
								<img className= {styles["images"]}src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
							);
						})}
						<button className={styles["invite-button"]} onClick={sendInvite}>
							<FontAwesomeIcon className={styles["invite-icon"]} size="4x" icon={faUserPlus}/>
						</button>
				</div>
				<div className={styles["chat"]}>
				{/* <Chat socket={socket} username={"mahek"} room={"my room"} /> */}
				<ShowChat/>
				
				</div>
			</div>
		</>
	)
}

export default VirtualSpace
