import React, { useContext, useState, useEffect } from "react"
import db from "./Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { parseQuery } from './utils'
// import Data from "./sample.user.data";

async function getDataByUsername(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q)
  let data = null
  querySnapshot.forEach(function (doc) {
    data = {...doc.data(), id: doc.id}
  })
  return data
}

// async function getDataById(id) {
//   const q = query(collection(db, "users"), where("id", "==", id));
//   const querySnapshot = await getDocs(q)
//   let data = null
//   querySnapshot.forEach(function (doc) {
//     data = doc.data()
//   })
//   return data
// }

const UserContext = React.createContext()

export const UserProvider = ({ query, children }) => {
  const [userData, setUserData] = useState({
    username: parseQuery(query).username,
  })

  console.log('context outside effect: ', userData)
  useEffect(() => {
    console.log('context inside effect: ', userData)
    if ("id" in userData) return
    console.log('context getting data')
    const dataPromise = getDataByUsername(userData.username)
    dataPromise.then(data => {
      setUserData(data)
      console.log('context got data: ', data)
    })

    // only time you'd need a cleanup function for this is when the user logs out
  }, [userData])

  // async function publishCollab({ id }) { 
  //   // adding the doc to the user's collabs array
  //   await updateDoc(doc(db, "users", "id"), {
  //     previousCollabs: arrayUnion(id)
  //   })

  //   // updating the user data state so that the context can be reused
  //   setUserData(await getDataById(userData.id))
  // }

  return (
    <UserContext.Provider value={{userData,setUserData}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)