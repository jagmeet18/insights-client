import styles from "./catalogue.picker.module.css"
// import ProfileCataloguePickerButton from "../../ButtonComp/Button.js"
import { CataloguePickerButtons as buttons } from "./catalogue.picker.buttons";

const ProfileCataloguePicker = ({setCatalogueState}) => {

    return ( 
        <div className={styles["button-container"]}>
            {buttons.map(({title, icon}) => { 
                return <button className={styles["collab-comm"]} value={title} onClick={(e) => setCatalogueState(e.target.value.toLowerCase())}>{icon} {title}</button>
            })}
        </div>
    );
}
 
export default ProfileCataloguePicker;

// const Button = () => {
//     return (  );
// }
 
// export default Button;
