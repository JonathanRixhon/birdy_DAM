import React, { Fragment } from 'react'
import LogInForm from './authentification/LogInForm'
import { Link } from 'react-router-dom'
import './styles/login.css'
export default function LogIn() {
  return (
    <Fragment>
      <h2 className='loginPage'>Connexion</h2>
      <LogInForm />
      <p className='loginPage'>Toujours pas de compte ?</p>
      <Link to='./inscription' className='loginPage'>
        S'inscrire
      </Link>
    </Fragment>
  )
}
