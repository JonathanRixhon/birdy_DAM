import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from './SignUpForm'
export default function SignIn() {
  return (
    <Fragment>
      <h2>S'inscrire</h2>
      <SignUpForm />
      <Link to='/connexion'>Retour à la page de connexion</Link>
    </Fragment>
  )
}
