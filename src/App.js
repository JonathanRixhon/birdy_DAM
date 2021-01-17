import './app.css'
import React, { useState, useContext } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import firebase from './utils/firebaseConfig'
/* Contexts */
import { UserAuthContext } from './contexts/UserAuthContext'
/* Components */
import LogIn from './components/LogIn'
import SignUp from './components/authentification/SignUp'
import Home from './components/Home'

/* App */
function App() {
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)

  return (
    <BrowserRouter>
      <header>
        <h1>Birdy</h1>
        <button onClick={() => firebase.auth().signOut()}>Déconnexion</button>
      </header>
      {currentUser ? (
        <Redirect to={{ pathname: './' }} />
      ) : (
        <Redirect to={{ pathname: './connexion' }} />
      )}
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/connexion' component={LogIn} exact />
        <Route path='/inscription' component={SignUp} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
