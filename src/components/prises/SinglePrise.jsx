import React, { Fragment, useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { PrisesContext } from '../../contexts/PrisesContext'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import firebase from '../../utils/firebaseConfig'
import '../../styles/singlePrise.css'

export default function SinglePrise() {
  const birdIndex = useLocation().state.index
  const [prises, setPrises] = useContext(PrisesContext)
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  const [action, setAction] = useState()
  let dbDate, currentBird

  if (!action) {
    if (prises) {
      currentBird = prises[birdIndex]
      dbDate = new Date(currentBird.date).toLocaleString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    }
  }
  const handleDelete = (e) => {
    e.preventDefault(e)
    setAction('delete')
    firebase
      .database()
      .ref(`users/${currentUser.uid}/captures/${currentBird.id}`)
      .remove()
  }
  const handleModify = (e) => {
    e.preventDefault()
    setAction('modify')
  }

  if (action === 'delete') {
    return <Redirect to={{ pathname: '/' }} />
  }
  return (
    <main className='singlePrise'>
      <h2>Mes prises</h2>
      {prises ? (
        <section>
          <h3>{currentBird.name}</h3>

          <article className='general'>
            <h4>Informations générales</h4>
            <dl>
              <dt>Lieu</dt>
              <dd>
                <dl>
                  <dt>Longitude</dt>
                  <dd>{currentBird.place.longitude}</dd>
                  <dt>Latitude</dt>
                  <dd>{currentBird.place.latitude}</dd>
                </dl>
              </dd>
              <dt>Date</dt>
              <dd>
                <time dateTime={currentBird.date}>{dbDate}</time>
              </dd>
              <dt>Technique</dt>
              <dd>{currentBird.technique}</dd>
              <dt>Numéro de bague</dt>
              <dd>{currentBird.ringNumber}</dd>
            </dl>
            <img
              src='https://i.pinimg.com/originals/10/06/25/100625569eb2d572cca231311e59b328.jpg'
              alt=''
            />
          </article>
          <article>
            <h4>Informations sur la prise</h4>
            <dl>
              <dt>Nom latin</dt>
              <dd>{currentBird.latinName}</dd>
              <dt>Charge alaire</dt>
              <dd>{currentBird.charge}</dd>
              <dt>Sexe</dt>
              <dd>{currentBird.sex}</dd>
              <dt>Âge</dt>
              <dd>{currentBird.age}</dd>
              <dt>Poids</dt>
              <dd>{currentBird.weight}</dd>
              <dt>Adiposité</dt>
              <dd>{currentBird.adiposity}</dd>
            </dl>
          </article>
          <Link
            className='buttonLink bigButton'
            to={{
              pathname: `/modifier/${currentBird.id}`,
              state: { bird: currentBird },
            }}>
            Modifier
          </Link>
          <button className='buttonLink' onClick={(e) => handleDelete(e)}>
            Supprimer
          </button>
        </section>
      ) : (
        <h3>Chargement</h3>
      )}
    </main>
  )
}
