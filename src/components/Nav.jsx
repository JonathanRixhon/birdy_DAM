import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../utils/firebaseConfig'

export default function Nav() {
  return (
    <Fragment>
      <h1>Birdy</h1>
      <button className='bigButton' onClick={() => firebase.auth().signOut()}>
        Déconnexion
      </button>
      <nav>
        <h2 className='visually-hidden'>Navigation principale</h2>
        <ul>
          <li>
            <Link to='/'>Acceuil</Link>
          </li>
          <li>
            <Link to='/mes_prises'>Mes prises</Link>
          </li>
          <li>
            <Link to='/encyclopedie'>Encyclopédie</Link>
          </li>
          <li>
            <Link to='/utilisateurs'>Utilisateurs</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}
