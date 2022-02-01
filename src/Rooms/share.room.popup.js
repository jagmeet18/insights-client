// import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import { getDoc, doc } from "firebase/firestore"; 
import styles from './create.room.popup.module.css';

export const ShareRoomPopup = () => {
    const [writeId, setWriteId] = useState('');
    const [formSubmitted, setFormSubmitted] = useState('');
    // const { id } = useParams()   //uncomment when vs room done
    const id = "1d880431-2a99-4e39-a5a6-6e4a9ff9c340"

    useEffect(() => { 
        console.log("in share room")
        console.log("id", id)
        const docRef = doc(db, "virtual-spaces", id);
        getDoc(docRef).then((snapshot) => {
            console.log(snapshot.data().writeId)
            // writeId = snapshot.data().writeId
            setWriteId(snapshot.data().writeId)
        })
    },[])

    function handleSubmit(e){
        setFormSubmitted(true) 
    }
    return (
        !formSubmitted &&
        <div className={styles["container"]}>
            <div className={styles["form"]}>
                <div className={styles["form_group"]}>
                    <div className={styles["header"]}>
                        <h2>Join Code</h2>
                    </div>
                    <label style={{marginBottom: "20px"}} htmlFor="Room Name" onClick={() => {navigator.clipboard.writeText(writeId)}}>{writeId}</label>
                    {/* <label htmlFor="Room Name"></label> */}
                    {/* <input type="text" name="roomname" placeholder="Room Name" value={writeId} onChange={(e) => setWriteId(e.target.value)} className={styles["name_textBox"]}></input> */}
                </div>
                <div className={styles["footer"]}>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]}>Go Back</button>
                </div>
            </div>
        </div>
     );
}

export default ShareRoomPopup;