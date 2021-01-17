import React, { useContext, useState } from 'react'
import { UserAuthContext } from '../contexts/UserAuthContext'
/* import firebase from 'firebase'*/
import firebase from '../utils/firebaseConfig'
export default function AuthForm() {
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .signInWithEmailAndPassword(mail, pass)
      .then((user) => {
        setCurrentUser(user)
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorMessage)
      })
  }
  return (
    <form onSubmit={(e) => handleSubmit()}>
      <label htmlFor='email'>Email</label>
      <input type='text' id='email' onChange={(e) => setMail(e.target.value)} />

      <label htmlFor='pass'>Password</label>
      <input
        type='password'
        id='pass'
        onChange={(e) => setPass(e.target.value)}
      />

      <input type='submit' />
    </form>
  )
}