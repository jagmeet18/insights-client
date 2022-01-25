import styles from './collab.catalogue.module.css'

import { MdSupervisorAccount as ContributorsIcon } from "react-icons/md";
import { HiOutlineDotsVertical as SettingsIcon } from "react-icons/hi";

const CollabCard = (props) => {
    return (
        <div className={styles["card-container"]}>
            <div className={styles["image-container"]}>
                <img src={props.img} alt='Collab Thumbnail'/>
            </div>
            <div className={styles["card-content"]}>
                <div className={styles["owner-icon-container"]}>
                    <img className={styles['owner-icon']} src={props.ownerIcon} alt='Collab Owner'/>
                </div>
                <div className={styles["card-body"]}>
                    {/** holds the title, community name, contributors icon, settings icon*/}
                    <div className={styles["card-header"]}>
                        <h3>{props.title}</h3>
                        <p style={{ fontSize: "75%"}}>{props.body}</p>
                    </div>
                    <div className={styles["card-footer"]}>
                        <ContributorsIcon />   
                        <div className={styles["card-settings-container"]}>
                            <SettingsIcon />
                        </div>
                    </div>
                </div>
            </div>
           
            <div className={styles["btn"]}>
                <button>
                    <a href="/">
                        View Collab
                    </a>
                </button>
            </div>
        </div>
    );
}
 
export default CollabCard;