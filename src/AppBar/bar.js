import styles from './appbar.module.css'

const AppBar = ({ styles: s, onClickHandler, buttons }) => {

    return(
        <nav className={styles["navbar"]} style={{...s}} >
            <div className={styles["button-container"]}>
                {buttons && buttons.map(({ text, value, icon: Icon }, index) => { 
                    const childrenStyles = { pointerEvents: "none" }
                    return <div key={index} className={styles["button"]} id={value} onClick={onClickHandler} ><Icon style={childrenStyles}/>{text && <p style={childrenStyles} >{text}</p>}</div>
                })}
            </div>
        </nav>
    )
}

export default AppBar