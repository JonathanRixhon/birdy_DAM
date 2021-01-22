import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from './SignUpForm'
import '../../styles/signup.css'
export default function SignIn() {
  return (
    <main className='signupPage'>
      <h2>Inscription</h2>
      <SignUpForm />
      <Link to='/connexion' className='buttonLink'>
        Retour à la page de connexion
      </Link>
    </main>
  )
}
