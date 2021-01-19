import React, { Fragment, useContext, useState } from 'react'
import ItemPrise from './ItemPrise'
import { PrisesContext } from '../../contexts/PrisesContext'
export default function MesPrises() {
  const [prises, setPrises] = useContext(PrisesContext)
  return (
    <Fragment>
      <h2>Mes prises</h2>
      {prises ? (
        <ul>
          {prises.map((prise, index) => (
            <ItemPrise key={index} capture={prise} number={index} />
          ))}
        </ul>
      ) : (
        <h3>Chargement</h3>
      )}
    </Fragment>
  )
}
