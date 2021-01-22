import React from 'react'
import { Link } from 'react-router-dom'

export default function itemPrise(props) {
  const prise = props.capture
  const dbDate = new Date(prise.date).toLocaleString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <li>
      <h3>{prise.name}</h3>
      <img
        src='https://www.consoglobe.com/wp-content/uploads/2020/06/epervier_shutterstock_45617836_ban.jpg'
        alt=''
      />
      <p>
        Le <time dateTime={prise.date}>{dbDate}</time>
      </p>
      <dl className='visually-hidden'>
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

      <dl className='ringNumber'>
        <dt>Numéro de bague</dt>
        <dd>{prise.ringNumber}</dd>
      </dl>
      <Link
        className='specialButton'
        to={{
          pathname: `/mes_prises/${prise.id}`,
          state: { birdId: prise.id, index: props.number },
        }}>
        En savoir plus
      </Link>
    </li>
  )
}
