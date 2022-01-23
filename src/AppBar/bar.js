// import logo from "../assets/logo.png"
import styles from './appbar.module.css'

const AppBar = ({ buttons }) => {

    return(
        <nav className={styles["navbar"]}>
            {/* {buttons.map((button, index) => {
                button.key = index;
                return button
            })} */}
        </nav>
    )
}

export default AppBar