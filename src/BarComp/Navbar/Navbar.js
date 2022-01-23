import React from "react"
import logo from "../assets/logo.png"
import './Navbar.css'

class Navbar extends React.Component {
    render() {
        return(
            <nav className="navbar">
                <a className="font-link logo" href="#">INSIGHTS</a>{/*<a href="#">
                    <img src={logo} alt="logo"/>
                </a>*/}
            </nav>
        )
    }
}

export default Navbar