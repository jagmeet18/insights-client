import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import AppBar from '../AppBar/bar'
import CollabCatalogue from './collab.catalogue';
import CommunityCatalogue from './community.catalogue';
// import ProfileCataloguePicker from './catalogue.picker';
import { useUser } from '../user.context'
import { AppBarButtons } from './appbar.buttons'
// import { CataloguePickerButtons as buttons } from "./catalogue.picker.buttons";

const Profile = () => {
    const [catalogueState, setCatalogueState] = useState("collabs");
    const history = useHistory();
    const { userData } = useUser()
	console.log("Profile component - context:",userData)

    const onLogOut = (e) => { 
        e.preventDefault()
        console.log('logging out')
        localStorage.removeItem('signin-queries')
        history.push('/')
    }

    return ( 
        <>
            <AppBar onClickHandler={onLogOut} buttons={AppBarButtons}/>
            <div>
                {
                    userData.id ?
                    <>
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
                                    src={userData.pfp}
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
                                <h2>{userData.username}</h2>
                                {/** Rest of the info about the profile */}
                                <div style={{
                                    width: "100%",
                                    //    border: "2px solid blue"
                                }}>
                                    <h4>{userData.publishedCollabs && userData.publishedCollabs.length} Collabs</h4>
                                    <h4>{userData.previousCommunities && userData.previousCommunities.length} Communities joined</h4>
                                </div>
                            </div>
                        </div>
                        <div >
                            {/* <ProfileCataloguePicker setCatalogueState={setCatalogueState, buttons}/> */}
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
                    </> : <h1 style={{padding:"50px"}}>Loading...</h1>
                }
            </div>
        </>
     );
                
}
export default Profile;
