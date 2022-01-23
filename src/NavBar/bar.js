import React from "react";
import { NavBarItems } from "./items";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBookmark,
  faCompass,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      communities: {
        showText: false,
      },
      rooms: {
        showText: false,
      },
      profile: {
        showText: false,
      },
    };

  }

  render() {
    const icons = [faUsers, faBookmark, faCompass, faUserCircle];
    return (
      <nav className={styles.sidebar}>
        <ul className={styles["sidebar-items"]}>
          {NavBarItems.map((item, index) => {
            const hoverHandler = () => {
              this.setState((prevState) => { 
                return {
                  ...prevState,
                  [item.title]: {
                    showText: true
                  }
                }
              });
            };
            const outHandler = () => {
              this.setState((prevState) => { 
                return {
                  ...prevState,
                  [item.title]: {
                    showText: false
                  }
                }
              });
            };
            return (
              <li key={index}>
                <a
                  className={styles[item.cName]}
                  href={item.url}
                  onMouseEnter={hoverHandler}
                  onMouseLeave={outHandler}
                >
                  <FontAwesomeIcon icon={icons[index]} size="2x" />
                  {
                    // this.state.showText && (
                    this.state[item.title].showText &&
                    (<p className={styles["display-title"]}>{item.title}</p>)
                    // )
                  }
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}