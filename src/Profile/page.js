import { useState } from 'react'
import AppBar from '../AppBar/bar'
import CollabCatalogue from './collab.catalogue';
import CommunityCatalogue from './community.catalogue';
import { auth } from "../firebase"
import { signOut } from 'firebase/auth'
import ProfileCataloguePicker from './catalogue.picker';
import { useUser } from '../context/user'
import { AppBarButtons } from './appbar.buttons'
import { CataloguePickerButtons as buttons } from "./catalogue.picker.buttons";

const Profile = () => {
    const [catalogueState, setCatalogueState] = useState("collabs");
    const { userData } = useUser()
	console.log("Profile component - context:",userData)

    const onLogOut = (e) => { 
        e.preventDefault()
        signOut(auth)
    }
    return ( 
        <>
            <AppBar onClickHandler={onLogOut} buttons={AppBarButtons}/>
            <div>
                    {/** Entire top section above the buttons for the catalogue*/}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        // margin:"40px 0px",
                        borderBottom: "3px solid #08183A",
                        padding: "2%",
                        gap: "4rem"
                        // border: "2px solid red"

                    }}>
                        {/** Profile pic */}
                        <div>
                            <img style={{
                                // border: "2px solid blue",
                                borderRadius: "50%",
                                width: "160px",
                                height: "160px",
                                margin: "10px"
                            }}
                                src={userData.data ? userData.data.pfp : require('../assets/default.images').default.user}
                                alt='Profile'
                            />
                        </div>
                        {/** Section on the right with profile info */}
                        <div style={{
                            // border: "2px solid red",
                            textAlign: "left",
                            margin: "10px",
                            color: "black",
                        }}>
                            {/** Just the username */}
                            <h2>{userData.data ? userData.data.username : "Loading username..."}</h2>
                            {/** Rest of the info about the profile */}
                            <div style={{
                                width: "100%",
                                //    border: "2px solid blue"
                            }}>
                            { userData.data ?
                                <>
                                    <h4>{userData.data.publishedCollabs.length} Collabs</h4>
                                    <h4>{userData.data.previousCommunities.length} Communities joined</h4>
                                </> : <h4>Loading stats...</h4>
                            }
                            </div>
                        </div>
                    </div>
                    <div >
                        <ProfileCataloguePicker setCatalogueState={setCatalogueState} buttons={buttons}/>
                    </div>
                    {
                        (() => {
                            if (catalogueState === "collabs") {
                                return <CollabCatalogue />
                            } else if (catalogueState === "communities") {
                                return <CommunityCatalogue />
                            } else {
                                return (
                                    <div>
                                        <h1>You should not be here</h1>
                                    </div>
                                )
                            }
                        })()
                    }
            </div>
        </>
     );
                
}
export default Profile;
