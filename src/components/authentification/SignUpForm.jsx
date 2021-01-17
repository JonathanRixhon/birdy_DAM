import React, { useContext, useState } from 'react'
import { UserAuthContext } from '../../contexts/UserAuthContext'
/* import firebase from 'firebase'*/
import firebase from '../../utils/firebaseConfig'
export default function AuthForm() {
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')

  const [userDatas, setUserDatas] = useState({
    idSc: '',
    lastName: '',
    name: '',
    places: { 'nom de place': 'valeure' },
    captures: [],
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .createUserWithEmailAndPassword(mail, pass)
      .then((user) => {
        // Signed in
        setCurrentUser(user)
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
      })
  }

  const writeUserData = (userDatas) => {
    console.log('envoyé: ', currentUser.user.uid, userDatas)
    firebase.database().ref(`users/${currentUser.user.uid}`).set(userDatas)
  }
  if (currentUser) {
    console.log(currentUser.user)
    writeUserData(userDatas)
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='lastname'>Nom</label>
      <input
        type='text'
        id='lastname'
        onChange={(e) =>
          setUserDatas({ ...userDatas, lastName: e.target.value })
        }
      />

      <label htmlFor='name'>Prénom</label>
      <input
        type='text'
        id='name'
        onChange={(e) => setUserDatas({ ...userDatas, name: e.target.value })}
      />

      <label htmlFor='idSciences'>Identifiant de l'institut des sciences</label>
      <input
        type='text'
        id='idSciences'
        onChange={(e) => setUserDatas({ ...userDatas, idSc: e.target.value })}
      />

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
