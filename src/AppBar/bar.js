import React from "react"
// import logo from "../assets/logo.png"
import styles from './appbar.module.css'

class AppBar extends React.Component {

    render() {
        return(
            <nav className={styles["navbar"]}>
                <a className={styles["font-link logo"]} href="#">INSIGHTS</a>
            </nav>
        )
    }
}

export default AppBar