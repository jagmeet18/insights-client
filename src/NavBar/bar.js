import React from "react";
import { NavBarItems } from "./items";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      Communities: {
        showText: false,
      },
      Rooms: {
        showText: false,
      },
      Profile: {
        showText: false,
      },
      Settings: {
        showText: false,
      },
    };
  }

  render() {
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
                <Link
                  to={`${this.props.match.path}${item.url}`}
                  className={styles[item.cName]}
                  onMouseEnter={hoverHandler}
                  onMouseLeave={outHandler}
                  onClick={() => console.clear()}
                >
                  <FontAwesomeIcon icon={item.fontClass} size="2x" />
                  {
                    this.state[item.title].showText &&
                    (<p className={styles["display-title"]}>{item.title}</p>) 
                  }
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default withRouter(NavBar)