import { useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../Firebase/firebase";
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore"; 
import styles from './create.room.popup.module.css';
import { useUser } from '../user.context'

export const JoinRoomPopup = () => {
    const [writeId, setWriteId] = useState('');
    const [formSubmitted, setFormSubmitted] = useState('');
    const [denied, setDenied] = useState(false);
    const { userData, setUserData } = useUser();
    const history = useHistory();
 
    async function handleSubmit(e){
        e.preventDefault()
        try {
            const q = query(collection(db, "virtual-spaces"), where("writeId", "==", writeId));
            const querySnapshot = await getDocs(q)
            let data = null
            let id = null
            querySnapshot.forEach(function (doc) {
                data = doc.data()
                id = doc.id
            })
            if (!data) throw {code:404, msg:"Room doesn't exist"}

            updateDoc(doc(db, "users", userData.id), {
                previousRooms: arrayUnion(id),
                previousCollabs: arrayUnion(data.collabId)
            })
            setUserData((prev) => { 
                return {
                    ...prev,
                    previousRooms: [...new Set([...prev.previousRooms, id])],
                    previousCollabs: [...new Set([...prev.previousCollabs, data.collabId])]
                }
            })
            setFormSubmitted(true)
            history.push(`/app/vs/${id}`) //uncomment when vs room done        
        } catch (error) {
            error.code && (error.code === 404 && setDenied(true))
            throw error
        }
    }

    return (
        !formSubmitted &&
        <div className={styles["container"]}>
            <div className={styles["form"]}>
                <div className={styles["form_group"]}>
                    <div className={styles["header"]}>
                        <h2>Join Room</h2>
                    </div>
                    {denied && <div className={styles["errorHandle"]}>Invalid room credentials</div>} 
                    <label htmlFor="Room Name">Enter a room code</label>
                    <input type="text" name="roomname" placeholder="Room Name" value={writeId} onChange={(e) => setWriteId(e.target.value)} className={styles["name_textBox"]}></input>
                </div>
                {/* <div className={styles["form_group"]}>
                    <label htmlFor="Community Name">Community</label>
                    <input type="text" name="community" placeholder="Community Name" value={CName} onChange={(e) => setCName(e.target.value)} className={styles["name_textBox"]}></input>
                </div> */}
                <div className={styles["footer"]}>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]}>Join Room</button>
                </div>
            </div>
        </div>
     );
}

export default JoinRoomPopup;