import React, { Fragment, useContext, useState } from 'react'
import ItemPrise from './ItemPrise'
import { PrisesContext } from '../../contexts/PrisesContext'
import '../../styles/prises.css'

export default function MesPrises() {
  const [prises, setPrises] = useContext(PrisesContext)
  if (!prises) {
    return (
      <Fragment>
        <h2>Mes prises</h2>
        <p>Chargement</p>
      </Fragment>
    )
  } else {
    const nbPrises = prises.length
    console.log(nbPrises)
    return (
      <main className='prises'>
        <h2>Mes prises</h2>
        {nbPrises ? (
          <ul>
            {prises.map((prise, index) => (
              <ItemPrise key={index} capture={prise} number={index} />
            ))}
          </ul>
        ) : (
          <p>Vous n'avez toujours pas de prise! Il est temps de s'y mettre</p>
        )}
      </main>
    )
  }
}
