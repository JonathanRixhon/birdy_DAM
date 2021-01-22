import './app.css'
import React, { useState, useContext } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import firebase from './utils/firebaseConfig'
/* Contexts */
import { UserAuthContext } from './contexts/UserAuthContext'
import { UserListProvider } from './contexts/UserListContext'
import { PrisesProvider } from './contexts/PrisesContext'
import { EncycloProvider } from './contexts/EncycloContext'
/* Components */
import Nav from './components/Nav'
import LogOutNav from './components/LogOutNav'
import LogIn from './components/LogIn'
import SignUp from './components/authentification/SignUp'
import Home from './components/Home'
import Encyclopedie from './components/encyclopedie/Encyclopedie'
import SingleBird from './components/encyclopedie/SingleBird'
import UserList from './components/userlist/UserList'
import AddBird from './components/addbird/AddBird'
import Prises from './components/prises/Prises'
import SinglePrise from './components/prises/SinglePrise'
import ModifyBird from './components/prises/ModifyBird'

/* App */
function App() {
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)

  return (
    <BrowserRouter>
      <header>{currentUser ? <Nav /> : <LogOutNav />}</header>
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
        <Route path='/modifier/:idBird' exact>
          <PrisesProvider>
            <ModifyBird />
          </PrisesProvider>
        </Route>
        <Route path='/encyclopedie' exact>
          <EncycloProvider>
            <Encyclopedie />
          </EncycloProvider>
        </Route>
        <Route path='/encyclopedie/:idBird' exact>
          <EncycloProvider>
            <SingleBird />
          </EncycloProvider>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
