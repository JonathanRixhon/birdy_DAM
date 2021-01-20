import React, { useState, createContext, useEffect } from 'react'
import firebase from '../utils/firebaseConfig'

export const EncycloContext = createContext()

export const EncycloProvider = (props) => {
  const [encyclopedie, setEncyclopedie] = useState([])
  useEffect(() => {
    const db = firebase.database().ref()
    db.on('value', (snap) => {
      const data = snap.val()
      const ArrayEncyclopedie = []
      for (let singleElt in data.encyclopedie) {
        ArrayEncyclopedie.push({
          id: singleElt,
          ...data.encyclopedie[singleElt],
        })
      }
      setEncyclopedie(ArrayEncyclopedie)
    })
  }, [])
  return (
    <EncycloContext.Provider value={[encyclopedie, setEncyclopedie]}>
      {props.children}
    </EncycloContext.Provider>
  )
}
