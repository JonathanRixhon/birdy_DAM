import React, { useContext, useState } from 'react'
import { UserAuthContext } from '../../contexts/UserAuthContext'
/* import firebase from 'firebase'*/
import firebase from '../../utils/firebaseConfig'
export default function AuthForm() {
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState()
  const regExprId = /^(\d{4})([A-Z]{2})$/gi

  const [userDatas, setUserDatas] = useState({
    idSc: null,
    lastName: null,
    name: null,
  })

  const inputValidation = (e) => {
    if (!userDatas.name) {
      setError('Veuillez entrer votre prénom.')
    }

    if (!userDatas.lastName) {
      setError('Veuillez entrer votre nom de famille.')
    }

    if (userDatas.idSc) {
      if (!userDatas.idSc.match(regExprId)) {
        setError("Entrez un Identifiant de l'institut des sciences valide.")
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    inputValidation()
    console.log(error)
    if (!error) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail, pass)
        .then((user) => {
          // Signed in
          setCurrentUser(user)
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/internal-error':
              setError(
                "Le serveur d'authentification a rencontré une erreur inattendue lors de la tentative de traitement de la demande."
              )
              break
            case 'auth/email-already-in-use':
              setError('Cet utilisateur existe déjà')
              break
            case 'auth/invalid-email':
              setError('Adresse mail non valide')
              break

            default:
              break
          }
        })
      if (currentUser) {
        writeUserData(userDatas)
      }
    }
  }

  const writeUserData = (userDatas) => {
    console.log('envoyé: ', currentUser.user.uid, userDatas)
    firebase.database().ref(`users/${currentUser.user.uid}`).set(userDatas)
  }

  return (
    <form className='signUpForm' onSubmit={(e) => handleSubmit(e)}>
      {error ? (
        <p className='alert'>
          <i>{error}</i>
        </p>
      ) : null}

      <fieldset>
        <legend>Identification</legend>
        <label htmlFor='email'>Adresse mail</label>
        <input
          placeholder='Adresse mail'
          type='text'
          id='email'
          onChange={(e) => setMail(e.target.value)}
        />

        <label htmlFor='pass'>Mot de passe</label>
        <input
          placeholder='Mot de passe'
          type='password'
          id='pass'
          onChange={(e) => setPass(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <legend>Informations personnelles</legend>
        <label htmlFor='lastname'>Nom</label>
        <input
          placeholder='Nom'
          type='text'
          id='lastname'
          onChange={(e) =>
            setUserDatas({ ...userDatas, lastName: e.target.value })
          }
        />

        <label htmlFor='name'>Prénom</label>
        <input
          placeholder='Prénom'
          type='text'
          id='name'
          onChange={(e) => setUserDatas({ ...userDatas, name: e.target.value })}
        />

        <label htmlFor='idSciences'>
          Identifiant de l'institut des sciences
        </label>
        <input
          placeholder='Identifiant'
          type='text'
          id='idSciences'
          onChange={(e) => setUserDatas({ ...userDatas, idSc: e.target.value })}
        />
      </fieldset>
      <input type='submit' value="S'inscrire" className='bigButton' />
    </form>
  )
}
