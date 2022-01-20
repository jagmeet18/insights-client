import CollabSection from './CollabSection';
import CommunitySection from './CommunitySection';
// import './Cards.css'
import { useState } from 'react'


const Profile = (props) => {
    const [catalogueState, setCatalogueState] = useState("collab");

    return ( 
       <>
           {/** Entire top section above the buttons for the catalogue*/}
           <div style={{
                display:"flex",
                justifyContent:"center",
                // margin:"40px 0px",
                borderBottom: "1px solid grey",
                border: "2px solid red"
           }}>
               {/** Profile pic */}
               <div>
                    <img style={{
                        border: "2px solid blue",
                        width: "160px",
                        height: "160px",
                        margin: "10px"
                    }}
                    src={props.img}/>
               </div>
               {/** Section on the right with profile info */}
               <div style={{
                    border: "2px solid red",
                    textAlign:"center",
                    margin: "10px"
                   }}>
                    {/** Just the username */}
                   <h2>{props.userName}</h2>
                    {/** Rest of the info about the profile */}
                   <div style={{
                       width:"100%",
                       border: "2px solid blue"
                   }}>
                       <h4>{props.noCollabs} Collabs</h4>
                       <h4>{props.noCommunities} Communities joined</h4>
                   </div>
                </div>
                { /** Section for profile description */}
                <div style={{
                    borderRadius: "25px",
                    border: "2px solid green",
                    background: "#73AD21",
                    width: "100px",
                    margin: "10px"
                }}>
                     
                 </div>
           </div>
           <div className="button-section">
               {/*buttons come here with links*/}
           </div>
           {
                (() => { 
                    if (catalogueState === "collab") {
                        return <CollabSection/>
                    } else if(catalogueState === "community") {
                        return <CommunitySection/>
                    }
                })()
           }
       </> 
     );

}
export default Profile;
