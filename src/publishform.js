import { useState } from "react";
import { useParams } from "react-router-dom";
import db from "./Firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import styles from './Rooms/create.room.popup.module.css';


const Publish = () => {

    const [pfp, setPfp] = useState(require("./assets/default.images").default.user);
    const [name, setName] = useState('');
    const { id } = useParams()
    const [publishForm, setpublishForm] = useState('');

    const UploadPic = (e) => {
        console.log('button to upload clicked')
        const file = e.target.files[0]
        const reader = new FileReader(); 
        reader.onload = (readerEvent) => {
            console.log('file value: ', file)
            if(reader.readyState === 2){
                setPfp(reader.result);
            }
            reader.abort()
        }
        file && reader.readAsDataURL(file);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const docSnap = await getDoc(doc(db, "virtual-spaces", id));
            
            if (!docSnap.data()) throw {code:404, msg:"Room doesn't exist"}
            const collabId = docSnap.data().collabId
            console.log(collabId);
        
            updateDoc(doc(db, "collabs", collabId), {
                name: name,
                displayPic: pfp,
                published: true
            });
            setpublishForm(true);
            
        } catch (error) {
            console.log(error)
        }

    }

    return ( 
        !publishForm ?
        <div className={styles["container"]}>
            <div className={styles["form"]}>

                <div className={styles["header"]}>Publish Collab</div>

                <div className={styles["form_group"]}>
                    <div className={styles["header"]}><h1>PUBLISH</h1></div>
                </div>

                <div className={styles["form_group"]}>
                <div className={styles["form_group"]}>
                    Name of the Collab
                    <input type="text" name="bio" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                </div>

                <div className={styles["pfp"]}>
                    <p>Add Collab picture</p>
                    <input type="file" accept="image/*" name="image-upload" id="input" onChange={UploadPic}></input>
                    {/* need to add the functionallity for uploading poic ture will do later after finishing the resty of the work */}
                </div>

                

                <div className={styles["footer"]}>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]}>PUBLISH</button>
                </div>

            </div>
        </div> : <></>
     );
}
 
export default Publish;