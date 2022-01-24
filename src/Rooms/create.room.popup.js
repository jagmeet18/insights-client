import { useState} from "react";
import { useHistory } from "react-router-dom";
import db from "../Firebase/firebase";
import { collection, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore"; 
import {v4 as uuidv4} from 'uuid';
import Rooms from "../Rooms/page";
import styles from './create.room.popup.module.css';
import { useUser } from '../user.context'

export const RoomForm = () => {
    const [RName, setRName] = useState('');
    const [CName, setCName] = useState('');
    const [formSubmitted, setFormSubmitted] = useState('');
    const history = useHistory();
    const user = useUser();
 
    const handleSubmit = (e) =>{
        console.log('this works')
        try{
            const id = uuidv4()
            addDoc(collection(db, "virtual-spaces"), {
                collabId: id,
                name: RName,
                communityName: CName,
                readId: uuidv4(),
                writeId: uuidv4(),
                editors: [],
                owners: [],
                readers: []
            }).then(docRef => {
                console.log("Document written with ID: ", docRef.id);
                history.push(`/app/rooms?name=${RName}`)
                setFormSubmitted(true)
            })

            updateDoc(doc(db, "users", user.id), {
                previousRooms: arrayUnion(id)
            });
        } catch(e) {
            console.log("DIDNT WORK", e);
        }
    }

    // const handleKeypress = e => {
    //     //it triggers by pressing the enter key
    //   if (e.keyCode === 13) {
    //     console.log("heyy")
    //   }
    // };
    // state = {
    //     message: ""
    // };

    return (
        !formSubmitted ?
        <div className={styles["container"]}>
            <div className={styles["form"]}>
                <div className={styles["form_group"]}>
                <div className={styles["header"]}>
                    <h2>Create Room</h2>
                </div>
                    <label htmlFor="Room Name">Room Name</label>
                    <input type="text" name="roomname" placeholder="Room Name" value={RName} onChange={(e) => setRName(e.target.value)} className={styles["name_textBox"]}></input>
                </div>
                <div className={styles["form_group"]}>
                    <label htmlFor="Community Name">Community</label>
                    <input type="text" name="community" placeholder="Community Name" value={CName} onChange={(e) => setCName(e.target.value)} className={styles["name_textBox"]}></input>
                </div>
                 <div className={styles["footer"]}>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]} >Create Room</button>
                </div>
            </div>
        </div> : <></>
     );
}

export default RoomForm;