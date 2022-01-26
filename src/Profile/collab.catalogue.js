import { useState, useEffect } from "react";
import CollabCard from "./collab.card"
import styles from './collab.catalogue.module.css'
import { useUser } from '../user.context'
import db from "../Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore"; 

// ==== PUBLISH COLLAB ====
// When publishing a collab, it's 'published' field is set to true,
// and the collab's id is added to the user's 'publishedCollabs' array.
// Also when publishing a collab, it's name, displayPic and description are updated.

const CollabCatalogue = () => {
    const [collabs, setCollabs] = useState([]);
    const { userData } = useUser();

    useEffect(() => { 
        // for every collab id, get the collab data from the collab collection
        const q = query(collection(db, "collabs"), where("published", "==", true), where("owners", "array-contains", userData.id))
        getDocs(q).then((snapshot) => {
            snapshot.forEach((doc) => {
                setCollabs(prevCollabs => [...prevCollabs, doc.data()])
            });
        })
    },[])

    return ( 
        <div className={styles["all-collabs"]}>
            {
                // collabs.map((collab, index) => {
                //     console.log("collab: ", collab);
                //     return <p key={index}>{JSON.stringify(collab)}</p>
                // })
                collabs.map(({ displayPic, name, communityPosted }, index) => {
                    const ownerpic = require("../assets/default.images").default.user
                    console.log("ownerpic: ", ownerpic);
                    return <CollabCard
                        img={displayPic}
                        title={name}
                        ownerIcon={ownerpic}
                        body={communityPosted}
                    />
                })
            }
        </div>
     );
}

export default CollabCatalogue;