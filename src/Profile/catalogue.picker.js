import styles from "./catalogue.picker.module.css"
// import ProfileCataloguePickerButton from "../../ButtonComp/Button.js"

const ProfileCataloguePicker = ({setCatalogueState, buttons}) => {
    return ( 
        <div className={styles["button-container"]}>
            {buttons?.map(({text, value, icon: Icon}, index) => { 
                return <button key={index} className={styles["collab-comm"]} value={value} onClick={(e) => setCatalogueState(e.target.value)}><Icon/><p>{text}</p></button>
            })}
        </div>
    );
}
 
export default ProfileCataloguePicker;

// const Button = () => {
//     return (  );
// }
 
// export default Button;
