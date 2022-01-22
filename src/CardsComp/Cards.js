import './Cards.css'

import { MdSupervisorAccount as ContributorsIcon } from "react-icons/md";
import { HiOutlineDotsVertical as Settings } from "react-icons/hi";

const Cards = (props) => {
    return ( 

        <div className="card-container">
            <div className="image-container">
                <img src={props.img}/>
            </div>
            <div className="card-content">
                <div className="owner-icon-container">
                    <img className='owner-icon' src={props.ownerIcon}/>
                </div>
                <div className="card-body"> {/** holds the title, community name, contributors icon, settings icon*/}
                <div className="card-header">
                    <h3>{props.title}</h3>
                     <p style={{ fontSize: "75%"}}>{props.body}</p>
                </div>
                <div className="card-footer">
                    <ContributorsIcon style={{
                        height:"100%"
                    }}/>   
                    <div className="card-settings-container">
                       <Settings/>
                    </div>
                </div>
                    {/* <p>{props.body}</p> */}
                </div>
                {/* <div className="card-title">
                </div> */}
            </div>
           
            <div className="btn">
                <button>
                    <a href="/">
                        View Collab
                    </a>
                </button>
            </div>


        </div>
    
     );
}
 
export default Cards;