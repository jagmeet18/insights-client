import React from "react"
import { SidebarItems } from "./SidebarItems"
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBookmark, faCompass, faUserCircle } from '@fortawesome/free-solid-svg-icons'


class Sidebar extends React.Component  {
    constructor() {
        super()
        this.state = {
            showText: false
        }
    }
    
    render() {

        const icons = [faUsers, faBookmark, faCompass, faUserCircle]
        return(
            <nav className="sidebar">
                <ul className="sidebar-items">
                    {SidebarItems.map((item, index) => {            
                        const hoverHandler = () => {
                            this.setState({ showText:true })
                        }
                        const outHandler = () => {
                            this.setState({ showText:false })
                        }
                        return (
                            <li key={index}>
                                <a  className={item.cName} 
                                    href={item.url} 
                                    onMouseEnter={hoverHandler} 
                                    onMouseLeave={outHandler} >
                                        <FontAwesomeIcon icon={icons[index]} size="2x" />
                                        {this.state.showText && <p className="display-title">{item.title}</p>}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Sidebar

