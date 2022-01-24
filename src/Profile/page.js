import { useState } from 'react'
import AppBar from '../AppBar/bar'
import CollabCatalogue from './collab.catalogue';
import CommunityCatalogue from './community.catalogue';
import ProfileCataloguePicker from './catalogue.picker';
import { useUser } from '../user.context'

const Profile = () => {
    const [catalogueState, setCatalogueState] = useState("collabs");
    const User = useUser();

    return ( 
        <>
            <AppBar />
            <div>
                {/** Entire top section above the buttons for the catalogue*/}
                <div style={{
                        display:"flex",
                        justifyContent:"center",
                        // margin:"40px 0px",
                        borderBottom: "1px solid grey",
                        padding: "2%",
                        gap:"4rem"
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
                                src={User.pfp}
                                alt='Profile'
                            />
                    </div>
                    {/** Section on the right with profile info */}
                    <div style={{
                            // border: "2px solid red",
                            textAlign:"left",
                            margin: "10px"
                        }}>
                            {/** Just the username */}
                        <h2>{User.username}</h2>
                            {/** Rest of the info about the profile */}
                        <div style={{
                            width:"100%",
                            //    border: "2px solid blue"
                        }}>
                            <h4>{User.collabsList.length} Collabs</h4>
                            <h4>{User.communitiesList.length} Communities joined</h4>
                        </div>
                        </div>
                </div>
                <div >
                        <ProfileCataloguePicker setCatalogueState={setCatalogueState}/>
                </div>
                {
                    (() => { 
                        if (catalogueState === "collabs") {
                            return <CollabCatalogue />
                        } else if(catalogueState === "communities") {
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
