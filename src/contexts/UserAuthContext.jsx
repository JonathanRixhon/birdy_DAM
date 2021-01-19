import React, { createContext, useState, useEffect } from 'react'
import App from '../App'
import firebase from '../utils/firebaseConfig'

export const UserAuthContext = createContext()
export const UserAuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser)
  }, [])
  return (
    <UserAuthContext.Provider value={[currentUser, setCurrentUser]}>
      <App />
    </UserAuthContext.Provider>
  )
}
