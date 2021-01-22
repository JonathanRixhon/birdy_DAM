import React, { useState } from 'react'

export default function SingleUser(props) {
  const user = props.singleUser

  let nbrCaptures = 0
  for (let key in user.captures) {
    nbrCaptures++
  }

  /* console.log(user.captures ? user.captures.size : 'pas de captures') */
  return (
    <li className='itemList'>
      <h3>{`${user.name} ${user.lastName}`}</h3>
      <dl>
        <dt>Identifiant</dt>
        <dd>{user.idSc}</dd>
        {/*  <dt>Sites de capture préférés</dt>
        <dd>
          <ul>
            <li>EN COURS DE TAF</li>
            <li>EN COURS DE TAF</li>
          </ul>
        </dd> */}
        <dt>Nombre de captures</dt>
        <dd>{nbrCaptures}</dd>
      </dl>
    </li>
  )
}
