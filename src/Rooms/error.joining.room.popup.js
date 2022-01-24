// import { FaBeer } from 'react-icons/fa'
import {BiErrorAlt} from 'react-icons/bi'
import {AiOutlineArrowLeft} from 'react-icons/ai'
// import SignUp from './signup'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const ErrorJoiningRoomPopup = () => {
    const history = useHistory();
    const backbtn = () =>{
        history.push(`/signup`)
    }
    return ( 
        <div className="container2">
            <div className="box">
                 <div className="back" id='btn'onClick={backbtn}><AiOutlineArrowLeft></AiOutlineArrowLeft></div>
                <div className="smallBox">
                    < h1 className='error'> <BiErrorAlt></BiErrorAlt> Bro u in a room already </h1>
                </div>
                <div className="smallbox2">
                    <p> leave your current room to join another room </p>  
                </div>
            </div>
        </div>
     );
}
 
export default ErrorJoiningRoomPopup;