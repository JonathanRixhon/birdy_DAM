import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  Fragment,
} from 'react'
import firebase from '../utils/firebaseConfig'
import { UserAuthContext } from './UserAuthContext'

export const PrisesContext = createContext()
export const PrisesProvider = (props) => {
  const [prises, setPrises] = useState()
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)

  useEffect(() => {
    if (currentUser) {
      const db = firebase.database().ref()
      db.on('value', (snap) => {
        const data = snap.val()
        const arrayPrises = []
        for (let singleElement in data.users[currentUser.uid].captures) {
          arrayPrises.push({
            id: currentUser.uid,
            ...data.users[currentUser.uid].captures[singleElement],
          })
        }
        setPrises(arrayPrises)
      })
    }
  }, [])
  return (
    <Fragment>
      <PrisesContext.Provider value={[prises, setPrises]}>
        {props.children}
      </PrisesContext.Provider>
    </Fragment>
  )
}
