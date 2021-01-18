import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      <h2>Navigation principale</h2>
      <ul>
        <li>
          <Link to='/'>Acceuil</Link>
        </li>
        <li>
          <Link to='/mes_prises'>Mes prises</Link>
        </li>
        <li>
          <Link to='/encyclopedie'>Encyclopédie</Link>
        </li>
        <li>
          <Link to='/utilisateurs'>Utilisateurs</Link>
        </li>
      </ul>
    </nav>
  )
}
