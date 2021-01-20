import React, { Fragment, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { PrisesContext } from '../../contexts/PrisesContext'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import firebase from '../../utils/firebaseConfig'

export default function SinglePrise() {
  const birdIndex = useLocation().state.index
  const [prises, setPrises] = useContext(PrisesContext)
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  const [isDeleted, setIsDeleted] = useState()
  let dbDate, currentBird

  if (!isDeleted) {
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
    setIsDeleted(true)
    firebase
      .database()
      .ref(`users/${currentUser.uid}/captures/${currentBird.id}`)
      .remove()
  }
  if (isDeleted) {
    return <Redirect to={{ pathname: '/' }} />
  }
  return (
    <Fragment>
      <h2>Mes prises</h2>
      {prises ? (
        <section>
          <h3>{currentBird.name}</h3>
          <button onClick={(e) => handleDelete(e)}>Supprimer</button>
          <article>
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
        </section>
      ) : (
        <h3>Chargement</h3>
      )}
    </Fragment>
  )
}
