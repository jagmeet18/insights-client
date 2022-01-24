import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
initializeApp(firebaseConfig);
const db = getFirestore();
export default db