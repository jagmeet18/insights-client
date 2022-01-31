import { useState} from "react";
// import { useHistory } from "react-router-dom";
import db from "../Firebase/firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import {v4 as uuidv4} from 'uuid';
import styles from './create.room.popup.module.css';
import { useUser } from '../user.context'


function createRoom(options) {
    const { RId, collabId, RName, CommName, Uid} = options
    console.log("options when creating room: ",options)
    const vsPromise = setDoc(doc(db, "virtual-spaces", RId), {
        collabId,
        name: RName,
        communityName: CommName,
        readId: uuidv4(),
        writeId: uuidv4(),
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

export const CreateRoomPopup = () => {
    const [RName, setRName] = useState('');
    const [CName, setCName] = useState('');
    const [formSubmitted, setFormSubmitted] = useState('');
    const {userData, setUserData} = useUser();
    
    const handleSubmit = (e) =>{
        console.log('this works')
        try{
            const collabId = uuidv4()
            let RId = uuidv4()
            createRoom({RId, collabId, RName, CommName: CName, Uid: userData.id}).catch((err) => { 
                throw err
            }).then(() => {
                setUserData((prev) => {
                    return {
                        ...prev,
                        previousRooms: [...new Set([...prev.previousRooms, RId])],
                        previousCollabs: [...new Set([...prev.previousCollabs, collabId])]
                    }
                })
                // history.push({pathname: `/app/vs/${RName}`, state: {detail: collabId}}) //uncomment when vs room done
                setFormSubmitted(true)
            })
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
                    <input type="text" name="roomname" placeholder="Room Name" onChange={(e) => setRName(e.target.value)} className={styles["name_textBox"]}></input>
                </div>
                <div className={styles["form_group"]}>
                    <label htmlFor="Community Name">Community</label>
                    <input type="text" name="community" placeholder="Community Name" onChange={(e) => setCName(e.target.value)} className={styles["name_textBox"]}></input>
                </div>
                 <div className={styles["footer"]}>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]} >Create Room</button>
                </div>
            </div>
        </div> : <></>
     );
}

export default CreateRoomPopup;