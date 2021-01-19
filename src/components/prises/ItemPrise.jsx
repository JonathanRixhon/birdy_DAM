import React from 'react'
import { Link } from 'react-router-dom'

export default function SinglePrise(props) {
  const prise = props.capture
  return (
    <li>
      <h3>{prise.name}</h3>
      <img
        src='https://www.consoglobe.com/wp-content/uploads/2020/06/epervier_shutterstock_45617836_ban.jpg'
        alt=''
      />
      <p>
        Le <time dateTime={prise.date}>{prise.date}</time>
      </p>
      <dl>
        <dt>Lieu</dt>
        <dd>
          <dl>
            <dt>Longitude</dt>
            <dd>{prise.place.longitude}</dd>
            <dt>Latitude</dt>
            <dd>{prise.place.latitude}</dd>
          </dl>
        </dd>
      </dl>

      <dl>
        <dt>Numéro de bague</dt>
        <dd>{prise.ringNumber}</dd>
      </dl>
      <Link
        to={{
          pathname: `/mes_prises/${prise.id}`,
          state: { birdId: prise.id, index: props.number },
        }}>
        En savoir plus
      </Link>
    </li>
  )
}
