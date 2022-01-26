import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "./Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import styles from './Rooms/create.room.popup.module.css';

const Login = ({ history }) => {
    const [user, setUser] = useState();
    const [denied, setDenied] = useState(false);
    const [info, setInfo] = useState({
        username: "",
        password: ""
    });

    const handleInfo = (event) =>{
        if (denied) setDenied(false)
        const name = event.target.name;
        const value = event.target.value;
        setInfo({...info, [name] : value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try { 
            const q = query(collection(db, "users"), where("username", "==", info.username), where("password", "==", info.password));
            const querySnapshot = await getDocs(q)
            let data = null
            querySnapshot.forEach(function (doc) {
                data = doc.data()
            })
            localStorage.setItem('userId', '?username='+data.username)
            if (!data) throw {code:401, msg:"unauthorized user"}
            history.push(`/app?username=${info.username}`)
            setUser(data)
                    
        } catch (error) { 
            error.code && (error.code === 401 && setDenied(true))
        }
    }

    return ( 
        <div className={styles["container"]}>
            {/* <Link to="/vs" className={styles["links"]}>vs form</Link> */}
            {/* <Link to="/popup" className={styles["links"]}>pop up</Link> */}
            <div className={styles["form"]}>
                <div className={styles["header"]}>Login</div>
               {denied && <div className={styles["errorHandle"]}>denied</div>} 
                <div className={styles["form_group"]}>
                    <label htmlFor="Username">Username</label>
                    <input onChange={handleInfo} type="text" name="username" placeholder="Username"></input>                    
                </div>
                <div className={styles["form_group"]}>
                    <label htmlFor="Password">Password</label>
                    <input onChange={handleInfo} type="password" name="password" placeholder="Password"></input>
                </div>
                <div className={styles["footer"]}>
                    <Link to="/signup" className={styles["links"]}>Create an account?</Link>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]}>Login</button>
                </div>
            </div>
        </div>
     );
}
 
export default Login;
