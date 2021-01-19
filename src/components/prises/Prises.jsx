import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'

export default function MesPrises() {
  return (
    <Fragment>
      <h2>Mes prises</h2>
      <ul>
        <li>
          <h3>Epervier d'europe</h3>
          <img
            src='https://www.consoglobe.com/wp-content/uploads/2020/06/epervier_shutterstock_45617836_ban.jpg'
            alt=''
          />
          <p>
            Le <time dateTime='2020-03-22'>22 mars 2022</time> à
            <span> Harzé</span>
          </p>
          <dl>
            <dt>Numéro de bague</dt>
            <dd>F 1812 001 BEL U198</dd>
          </dl>
          <Link to='/mes_prises/nom_capture'>En savoir plus</Link>
        </li>
      </ul>
    </Fragment>
  )
}
