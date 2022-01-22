import CollabSection from './CollabSecComp/CollabSection';
import CommunitySection from './CommunityComp/CommunitySection';
// import './Cards.css'
import { useState } from 'react'
import CatalogueButtonSection from './ButtonComp/CatalogueButtonSection';


const Profile = (props) => {
    const [catalogueState, setCatalogueState] = useState("collabs");

    return ( 
       <div style={{paddingBottom:"5%"}}>
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
                    src={props.img}/>
               </div>
               {/** Section on the right with profile info */}
               <div style={{
                    // border: "2px solid red",
                    textAlign:"left",
                    margin: "10px"
                   }}>
                    {/** Just the username */}
                   <h2>{props.userName}</h2>
                    {/** Rest of the info about the profile */}
                   <div style={{
                       width:"100%",
                    //    border: "2px solid blue"
                   }}>
                       <h4>{props.collabsList.length} Collabs</h4>
                       <h4>{props.communitiesList.length} Communities joined</h4>
                   </div>
                </div>
                { /** Section for profile description */}
                {/* <div style={{
                    borderRadius: "25px",
                    border: "2px solid green",
                    background: "#73AD21",
                    width: "100px",
                    margin: "10px"
                }}>
                     
                 </div> */}
           </div>
           <div className="button-section">
               {/*buttons come here with links*/}
                 <CatalogueButtonSection setCatalogueState={(e)=>{
                     console.log(e.target.value)
                     setCatalogueState(e.target.value.toLowerCase())
                 }}/>
           </div>
           {
            //    <CommunitySection/>
                (() => { 
                    if (catalogueState === "collabs") {
                        return <CollabSection collabsList={props.collabsList}/>
                    } else if(catalogueState === "communities") {
                        return <CommunitySection/>
                    }
                })()
           }
       </div> 
     );

}
export default Profile;
