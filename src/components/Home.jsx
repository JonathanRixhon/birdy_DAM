import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <Fragment>
      <h2>Acceuil</h2>
      <Link to='/ajouter_un_oiseau' className='buttonLink'>
        Ajouter un oiseau
      </Link>
    </Fragment>
  )
}
