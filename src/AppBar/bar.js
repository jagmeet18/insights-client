// import logo from "../assets/logo.png"
import appBarStyles from './appbar.module.css'
import buttonStyles from '../Profile/catalogue.picker.module.css'
import Create from '../Rooms/create.room.popup'

const AppBar = ({ onClickHandler, buttons }) => {

    return(
        <nav className={appBarStyles["navbar"]}>
            <div className={buttonStyles["button-container"]}>
                {buttons && buttons.map(({text, value, icon: Icon}, index) => { 
                    return <button key={index} className={buttonStyles["collab-comm"]} value={value} onClick={onClickHandler} ><Icon/>{text}</button>
                })}
                {/* {buttons.map((button, index) => {
                    button.key = index;
                    return <button value={button.value} onClick={button.onClick} key={index}>{button.text}</button>
                })} */}
            </div>
        </nav>
    )
}

export default AppBar