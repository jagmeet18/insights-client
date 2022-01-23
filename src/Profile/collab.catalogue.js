import CollabCard from "./collab.card"
import styles from './collab.catalogue.module.css'
import { useUser } from '../user.context'

const CollabCatalogue = () => {
    const Collabs = useUser().collabsList;
    
    return ( 
        <div className={styles["all-collabs"]}>
            {
                Collabs.map(({img, title, ownerIcon, communityPosted}) => {
                    return <CollabCard
                        img={img}
                        title={title}
                        ownerIcon={ownerIcon}
                        body={communityPosted}
                    />
                })
            }
        </div>
     );
}

export default CollabCatalogue;