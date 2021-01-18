import React, { createContext, useState, useEffect } from 'react'
import firebase from '../utils/firebaseConfig'
import UserList from '../components/userlist/UserList'

export const UserListContext = createContext()
export const UserListProvider = (props) => {
  const [userList, setUserList] = useState([])
  useEffect(() => {
    const db = firebase.database().ref()
    db.on('value', (snap) => {
      const data = snap.val()
      const arrayUsers = []
      for (let singleElt in data.users) {
        arrayUsers.push({ id: singleElt, ...data.users[singleElt] })
      }
      setUserList(arrayUsers)
    })
  }, [])

  return (
    <UserListContext.Provider value={[userList, setUserList]}>
      <UserList />
    </UserListContext.Provider>
  )
}
