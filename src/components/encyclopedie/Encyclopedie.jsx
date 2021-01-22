import React, { Fragment, useState, useContext } from 'react'
import { EncycloContext } from '../../contexts/EncycloContext'
import EncycloItemList from './EncycloItemList'
import '../../styles/encyclopedie.css'
export default function Encyclopedie() {
  const [encyclopedie, setEncyclopedie] = useContext(EncycloContext)
  return (
    <main className='encyclopedie'>
      {encyclopedie ? (
        <Fragment>
          <h2>Encyclopédie</h2>
          <ul>
            {encyclopedie.map((bird, index) => (
              <EncycloItemList key={index} infos={bird} birdIndex={index} />
            ))}
          </ul>
        </Fragment>
      ) : (
        <h2>Chargement</h2>
      )}
    </main>
  )
}
