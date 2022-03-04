import { useState} from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import {v4 as uuidv4} from 'uuid';
import styles from '../styles/form.module.css';
import { useUser } from '../context/user'

export const JoinCommunityPopup = ({ onCancel }) => {
    const [RName, setRName] = useState('');
    const [CName, setCName] = useState('');
    const {userData, setUserData} = useUser();
    const history = useHistory();
function createRoom(options) {
    const { RId, collabId, readId, writeId, RName, CommName, Uid} = options
    console.log("options when creating room: ",options)
    const vsPromise = setDoc(doc(db, "virtual-spaces", RId), {
        collabId,
        name: RName,
        communityName: CommName,
        readId,
        writeId,
        editors: [],
        owners: [Uid],
        readers: []
    })

    const collabPromise = setDoc(doc(db, "collabs", collabId), {
        name: "", 
        displayPic: require("../assets/default.images").default.collab,
        communityPosted: [CommName],
        content: {},
        contributors: [],
        owners: [Uid],
        virtualSpaceId: RId, // maybe could get rid of this
        published: false,
    })

    const userPromise = updateDoc(doc(db, "users", Uid), { ///get data from context
        previousRooms: arrayUnion(RId),
        previousCollabs: arrayUnion(collabId)     //okay u got 2 options either: create doc with setDoc   ORRR   store the real id into user prev array fields
    });

    return Promise.all([vsPromise, collabPromise, userPromise])
}



    
    // const [CId, setCId] = useState('');
    // const [Uid, setUid] = useState('');

    const [RId, setRId] = useState('');
    // const [readId, setReadId] = useState('');
    // const [writeId, setWriteId] = useState('');
    // const [collabId, setCollabId] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        const collabId = uuidv4()
        const readId = uuidv4()
        const writeId = uuidv4()
        createRoom({RId, collabId, RName, readId, writeId, CommName: CName, Uid: userData.id}).catch((err) => { 
            throw err
        }).then(() => {
            setUserData((prev) => {
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        previousRooms: [...new Set([...prev.data?.previousRooms, RId])],
                        previousCollabs: [...new Set([...prev.data?.previousCollabs, collabId])]
                    }
                }
            })
        })
    }
    return ( 
       
        <div className={styles["container"]}>
        <h2>Create Room</h2>
        <div className={styles["form_group"]}>
            <label htmlFor="roomname">Room Name</label>
            <input type="text" name="roomname" placeholder="Room Name" onChange={(e) => setRName(e.target.value)} className={styles["name_textBox"]}></input>
        </div>
        <div className={styles["form_group"]}>
            <label htmlFor="Community Name">Community</label>
            <input type="text" name="community" placeholder="Community Name" onChange={(e) => setCName(e.target.value)} className={styles["name_textBox"]}></input>
        </div>
            <div className={styles["footer"]}>
            <button onClick={handleSubmit} type="button" className={styles["submit"]}>Create Room</button>
            <button type="button" onClick={onCancel} className={styles["cancel"]}>Cancel</button>
        </div>
    </div>
     );
}
 
export default JoinCommunityPopup;