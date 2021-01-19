import './app.css'
import React, { useState, useContext } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import firebase from './utils/firebaseConfig'
/* Contexts */
import { UserAuthContext } from './contexts/UserAuthContext'
import { UserListProvider } from './contexts/UserListContext'
import { PrisesProvider } from './contexts/PrisesContext'
/* Components */
import Nav from './components/userlist/Nav'
import LogIn from './components/LogIn'
import SignUp from './components/authentification/SignUp'
import Home from './components/Home'
import UserList from './components/userlist/UserList'
import AddBird from './components/addbird/AddBird'
import Prises from './components/prises/Prises'
import SinglePrise from './components/prises/SinglePrise'

/* App */
function App() {
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)

  return (
    <BrowserRouter>
      <header>
        <h1>Birdy</h1>
        {currentUser ? <Nav /> : <p>coucou</p>}
        <button onClick={() => firebase.auth().signOut()}>Déconnexion</button>
      </header>
      {currentUser ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <Redirect to={{ pathname: '/connexion' }} />
      )}

      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/connexion' component={LogIn} exact />
        <Route path='/inscription' component={SignUp} exact />
        <Route path='/utilisateurs' exact>
          <UserListProvider>
            <UserList />
          </UserListProvider>
        </Route>
        <Route path='/ajouter_un_oiseau' exact>
          <UserListProvider>
            <AddBird />
          </UserListProvider>
        </Route>
        <Route path='/mes_prises' exact>
          <PrisesProvider>
            <Prises />
          </PrisesProvider>
        </Route>
        <Route path='/mes_prises/:id_capture' exact>
          <PrisesProvider>
            <SinglePrise />
          </PrisesProvider>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
