import styles from "./catalogue.picker.module.css"
// import ProfileCataloguePickerButton from "../../ButtonComp/Button.js"

const ProfileCataloguePicker = ({setCatalogueState, buttons}) => {

    return ( 
        <div className={styles["button-container"]}>
            {buttons.map(({text, value, icon: Icon}) => { 
                return <button className={styles["collab-comm"]} value={value} onClick={(e) => setCatalogueState(e.target.value)}><Icon/> {text}</button>
            })}
        </div>
    );
}
 
export default ProfileCataloguePicker;

// const Button = () => {
//     return (  );
// }
 
// export default Button;
