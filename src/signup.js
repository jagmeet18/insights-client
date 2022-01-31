import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import db from "./Firebase/firebase";
import { doc, setDoc, getDocs, collection, where, query } from "firebase/firestore"; 
import {v4 as uuidv4} from 'uuid';
import styles from './Rooms/create.room.popup.module.css';


const SignUp = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [confirm, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [pfp, setPfp] = useState(require("./assets/default.images").default.user);
    const [bio, setBio] = useState('');

    const [PasswordDiff, setPasswordDiff] = useState();
    const history = useHistory();

    async function postUser(fName,lName,email,username,password,pfp,bio){
        try{
            const id = uuidv4()
            const data = {
                fName: fName,
                lName: lName,
                email: email,
                username: username,
                password: password,
                pfp: pfp,
                bio: bio,
                previousCollabs: [],
                previousRooms: [],
                previousCommunities: [],
                publishedCollabs: []
            }
            await setDoc(doc(db, "users", id), data)
            // localStorage.setItem("pw", password)
            history.push(`/app?username=${username}`)
        } catch(e) {
            console.log("DIDNT WORK", e);
        }
    }

    async function checkUser() {
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            doc.data()
            console.log(doc.data())
            return doc.data()
        });
        // console.log("E1", existingUser)
        return null
    }    

    const UploadPic = (e) => {
        console.log('button to upload clicked')
        const file = e.target.files[0]
        const reader = new FileReader(); 
        reader.onload = () => {
            console.log('file value: ', file)
            if(reader.readyState === 2){
                setPfp(reader.result);
                //console.log(reader.result)
            }
            reader.abort()
        }
        file && reader.readAsDataURL(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var existingUser = checkUser();
        // if(checkUser()) setPasswordDiff(true)
        // if(existingUser != null) setPasswordDiff(true)
        console.log("E", existingUser)
        if(confirm === password || existingUser == null) {
            postUser(fName, lName, email, username, password,pfp, bio);
            setPasswordDiff(false);
        } else {
            setPasswordDiff(true);
        }
        ///check if user already exists before pass check
    }

    return ( 
        // If session exists, redirect to /app, else continue
        <div className={styles["container"]}>
            <div className={styles["form"]}>
                <div className={styles["header"]}>Create an account</div>
                {PasswordDiff && <div className={styles["errorHandle"]}>Password is not the same try again</div> }
                <div className={styles["form_group"]}>
                    <div className={styles["header"]}><h1>Create an account</h1></div>
                    <label htmlFor="First Name">Name</label>
                    <input type="text" name="firstname" placeholder="First Name" onChange={(e) => setFName(e.target.value)} className={styles["name_textBox"]}></input>
                    
                    <input type="text" name="lastname" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} className={styles["name_textBox"]}></input>
                </div>
                <div className={styles["form_group"]}>
                    Email
                    <br />
                    <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className={styles["form_group"]}>
                    Username
                    <br />
                    <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className={styles["form_group"]}>
                    Password
                    <br />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className={styles["form_group"]}>
                    Confirm Password
                    <br />
                    <input type="password" name="Changepassword" placeholder="Password"  onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <div className={styles["form_group"]}>
                <div className={styles["pfp"]}>
                    <p>
                        Add profile picture
                    </p>
                    <input type="file" accept="image/*" name="image-upload" id="input" onChange={UploadPic}></input>
                    {/* need to add the functionallity for uploading poic ture will do later after finishing the resty of the work */}

                </div>
                </div>
                <div className={styles["form_group"]}>
                    Add Biography
                    <br />
                    <input type="text" name="bio" placeholder="Bio..." value={bio} onChange={(e) => setBio(e.target.value)}></input>
                </div>
                <div className={styles["footer"]}>
                    <div className={styles["msg"]}>Already have an account?</div>
                    <br />
                    <Link to="/login" className={styles["links2"]}>Log in</Link>
                    <button onClick={handleSubmit} type="button" className={styles["b1"]}>Sign up</button>
                </div>
            </div>
        </div>
     );
}
 
export default SignUp;