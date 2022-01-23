import React, { useContext, useState, useEffect } from "react"
import Data from "./sample.user.data";

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
    const [userDataOnSignIn, setUserDataOnSignIn] = useState()

    useEffect(() => {
        setUserDataOnSignIn(Data)
    }, [])

    return (
      <UserContext.Provider value={userDataOnSignIn}>
        {children}
      </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)