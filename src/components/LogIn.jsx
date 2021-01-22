import React, { Fragment } from 'react'
import LogInForm from './authentification/LogInForm'
import { Link } from 'react-router-dom'
import '../styles/login.css'
export default function LogIn() {
  return (
    <main className='loginPage'>
      <h2>Connexion</h2>
      <LogInForm />
      <Link to='./inscription' className='buttonLink'>
        S'inscrire
      </Link>
    </main>
  )
}
