import React, { Fragment } from 'react'
import AuthForm from './AuthForm'
import { Link } from 'react-router-dom'
export default function LogIn() {
  return (
    <Fragment>
      <h1>Log In</h1>
      <AuthForm />
      <p>Toujours pas de compte ?</p>
      <Link to='./inscription'>S'inscrire</Link>
    </Fragment>
  )
}
