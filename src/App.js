import React, { useState, useContext } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import firebase from './utils/firebaseConfig'
/* Contexts */
import { UserAuthContext } from './contexts/UserAuthContext'
/* Components */
import LogIn from './components/LogIn'
import Home from './components/Home'

/* App */
function App() {
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  console.log(currentUser)
  return (
    <BrowserRouter>
      <header>
        <h1>Birdy</h1>
        <button onClick={() => firebase.auth().signOut()}>Déconnexion</button>
      </header>
      {currentUser ? (
        <Redirect to={{ pathname: './Home' }} />
      ) : (
        <Redirect to={{ pathname: './login' }} />
      )}
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={LogIn} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
