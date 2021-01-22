import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
export default function Home() {
  return (
    <main className='homepage'>
      <h2>Accueil</h2>
      <Link to='/ajouter_un_oiseau' className='buttonLink bigButton'>
        Ajouter un oiseau
      </Link>
    </main>
  )
}
