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
            const collabId = uuidv4()
            let docId = null
            addDoc(collection(db, "virtual-spaces"), {
                collabId: collabId,
                name: RName,
                communityName: CName,
                readId: uuidv4(),
                writeId: uuidv4(),
                editors: [],
                owners: [],
                readers: []
            }).then(docRef => {
                console.log("Document written with ID: ", docRef.id);
                docId = docRef.id
                history.push(`/app/rooms?name=${RName}`)
                setFormSubmitted(true)
            })

            // updateDoc(doc(db, "users", user.userData[1]), { ///get data from context
            //     previousRooms: arrayUnion(docId)     //okay u got 2 options either: create doc with setDoc   ORRR   store the real id into user prev array fields
            // });
            console.log(user)
            // console.log(user.userData[0].username)
            // console.log(user.userData[1])
        } catch(e) {
            console.log("DIDNT WORK", e);
        }
    }

    //ADD TO JOIN ROOM PART
    // async function handleSubmit(e){
    //     e.preventDefault()
    //     try {
    //         let id = null
    //         const q = query(collection(db, "users"), where("writeId", "==", id.given));
    //         const querySnapshot = await getDocs(q)
    //         let data = null
    //         querySnapshot.forEach(function (doc) {
    //             data = doc.data()
    //             id = doc.id
    //         })
    //         if (!data) throw {code:401, msg:"room doesn't exist"}

    //         updateDoc(doc(db, "users", user.userData[1]), {
    //             previousRooms: arrayUnion(id)    
    //         });
    //         history.push(`/app?username=${info.username}`)
    //         setUser(data)
                    
    //     } catch (error) { 
    //         error.code && (error.code === 401 && setDenied(true))
    //     }
    // }

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