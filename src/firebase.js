import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbzQ9KWdzIgc7WQBYBcwNPVVlfJJ62o_Q",
    authDomain: "insights-server-fd594.firebaseapp.com",
    projectId: "insights-server-fd594",
    storageBucket: "insights-server-fd594.appspot.com",
    messagingSenderId: "296327912616",
    appId: "1:296327912616:web:23a251ebb954f7473ef69d",
    measurementId: "G-DTD0FKZHPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore service
const db = getFirestore(app);

// Get Auth service and set persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)

export { db, auth };