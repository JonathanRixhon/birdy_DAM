import React, { useContext, useState } from 'react'
import { UserAuthContext } from '../../contexts/UserAuthContext'
/* import firebase from 'firebase'*/
import firebase from '../../utils/firebaseConfig'
export default function LogInForm() {
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState()
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
        /* setError(error.code) */
        switch (errorCode) {
          case 'auth/wrong-password':
            setError('Mot de passe incorrect')
            break
          case 'auth/internal-error':
            setError(
              "Le serveur d'authentification a rencontré une erreur inattendue lors de la tentative de traitement de la demande."
            )
            break
          case 'auth/user-not-found':
            setError('Adresse email inconnue')
            break
          case 'auth/invalid-email':
            setError("Format d'aresse mail invalide")
            break

          default:
            break
        }
      })
  }

  return (
    <form className='loginForm' onSubmit={(e) => handleSubmit(e)}>
      {error ? <p className='alert'>{error}</p> : null}
      <label htmlFor='email'>Adresse mail</label>
      <input
        type='text'
        id='email'
        placeholder='Entrez votre adresse mail'
        onChange={(e) => setMail(e.target.value)}
      />
      <label htmlFor='pass'>Mot de passe </label>
      <input
        type='password'
        id='pass'
        placeholder='Entrez votre mot de passe'
        onChange={(e) => setPass(e.target.value)}
      />

      <input type='submit' />
    </form>
  )
}
