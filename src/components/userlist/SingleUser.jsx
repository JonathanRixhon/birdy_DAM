import React from 'react'

export default function SingleUser(props) {
  const user = props.singleUser
  return (
    <li>
      <h3>{`${user.name} ${user.lastName}`}</h3>
      <dl>
        <dt>Identifiant</dt>
        <dd>{user.idSc}</dd>
        <dt>Sites de capture préférés</dt>
        <dd>
          <ul>
            <li>EN COURS DE TAF</li>
            <li>EN COURS DE TAF</li>
          </ul>
        </dd>
        <dt>Captures</dt>
        <dd>EN COURS DE TAF</dd>
      </dl>
    </li>
  )
}
