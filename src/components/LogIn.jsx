import React, { Fragment } from 'react'
import LogInForm from './authentification/LogInForm'
import { Link } from 'react-router-dom'
export default function LogIn() {
  return (
    <Fragment>
      <h2>Connexion</h2>
      <LogInForm />
      <p>Toujours pas de compte ?</p>
      <Link to='./inscription'>S'inscrire</Link>
    </Fragment>
  )
}
