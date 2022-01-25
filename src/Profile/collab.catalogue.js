import { useState, useEffect } from "react";
import CollabCard from "./collab.card"
import styles from './collab.catalogue.module.css'
import { useUser } from '../user.context'
import db from "../Firebase/firebase";
import { collection, doc, getDocs, query, where, updateDoc, arrayUnion } from "firebase/firestore"; 

const CollabCatalogue = () => {
    const [collabs, setCollabs] = useState([]);
    const { userData } = useUser();
    console.log("collabdata: ", userData);
    useEffect(() => { 
        // const collabIds = userData.previousCollabs;
        // // for every collab id, get the collab data from the collab collection
        // collabIds.forEach(collabId => {
        //     const q = query(collection(db, "collab"), where("id", "==", collabId));
        //     getDocs(q).then(snapshot => {
        //         snapshot.forEach(function (doc) {
        //             const collab = doc.data()
        //             setCollabs(prevCollabs => [...prevCollabs, collab])
        //         })
        //     });
        // })
    },[])

    return ( 
        <div className={styles["all-collabs"]}>
            {/* {
                collabs.map(({displayPicture, name, ownerPic, communityPosted}) => {
                    return <CollabCard
                        img={displayPicture}
                        title={name}
                        ownerIcon={ownerPic}
                        body={communityPosted}
                    />
                })
            } */}
        </div>
     );
}

export default CollabCatalogue;