import React from 'react';
import AppBar from '../AppBar/bar';
import { AppBarButtons } from "./appbar.buttons"
import CreateCommunityPopup from './Join.Community.Popup';
import JoinCommunityPopup from './Create.Community.Popup';
import { useState, useEffect } from "react"

const Communities = () => {

  const [appBarStatus, setAppBarStatus] = React.useState(null);

  function onStatusChange(e) {
		e.preventDefault()
		const val = e.target.id
		setAppBarStatus(val)
	}

  const onLeaveRoom = () => { 
  
  }
  const hideForm = () => {
    setAppBarStatus(null)
  }
  
    return <>
      <AppBar onClickHandler={onStatusChange} buttons={AppBarButtons}/>
      {
				appBarStatus === "join_community" ? <JoinCommunityPopup onCancel={hideForm} /> : (
					appBarStatus === "create_community" && <CreateCommunityPopup onCancel={hideForm} />
				)	
			}
    </>;
}

export default Communities;
