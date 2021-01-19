import React, { Fragment, useContext, useState } from 'react'
import firebase from '../../utils/firebaseConfig'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import { Redirect } from 'react-router-dom'
import * as geolib from 'geolib'

export default function AddBird() {
  const [submited, setSubmited] = useState()

  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  const [bird, setBird] = useState({})

  const [currentPosition, setCurrentPosition] = useState()

  const setLocation = (position) => {
    if (position) {
      let tempPosition = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      }
      setCurrentPosition(tempPosition)
      setBird({ ...bird, place: tempPosition })
    }
  }

  const errorHandler = (error) => {
    console.log(error)
  }

  const geolocate = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(setLocation, errorHandler)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmited(true)
    firebase.database().ref(`users/${currentUser.uid}/captures`).push(bird)
    console.log(e)
  }
  if (submited) {
    return <Redirect to={{ pathname: '/' }} />
  }

  console.log(bird)
  return (
    <Fragment>
      <h2>Ajouter un oiseau</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>Informations générales</legend>
          <label htmlFor='nom'>Nom</label>
          <input
            type='text'
            name='nom'
            id='nom'
            onChange={(e) => setBird({ ...bird, name: e.target.value })}
          />

          <fieldset>
            <legend>Lieu</legend>
            <label htmlFor='longitude'>Longitude</label>
            <input
              type='text'
              name='longitude'
              id='longitude'
              placeholder={currentPosition ? currentPosition.longitude : ''}
              onChange={(e) =>
                setBird({
                  ...bird,
                  place: { ...bird.place, longitude: e.target.value },
                })
              }
            />
            <label htmlFor='latitude'>Latitude</label>
            <input
              type='text'
              name='latitude'
              id='latitude'
              placeholder={currentPosition ? currentPosition.latitude : ''}
              onChange={(e) =>
                setBird({
                  ...bird,
                  place: { ...bird.place, latitude: e.target.value },
                })
              }
            />
            <a href='#' onClick={(e) => geolocate(e)}>
              Géolocaliser
            </a>
          </fieldset>

          <label htmlFor='date'>Date</label>
          <input
            type='date'
            name='date'
            id='date'
            onChange={(e) => setBird({ ...bird, date: e.target.value })}
          />

          <label htmlFor='technique'>Technique</label>
          <select
            name='technique'
            id='technique'
            onChange={(e) => setBird({ ...bird, technique: e.target.value })}>
            <option value=''>Choisir une option</option>
            <option value='filet'>Filet</option>
            <option value='piege'>Piége</option>
          </select>

          <label htmlFor='numero'>Numéro de bague</label>
          <input
            type='text'
            name='numero'
            id='numero'
            onChange={(e) => setBird({ ...bird, ringNumber: e.target.value })}
          />
        </fieldset>

        <fieldset>
          <legend>Informations à propos de la prise</legend>

          <label htmlFor='nomlatin'>Nom Latin</label>
          <input
            type='text'
            name='nomlatin'
            id='nomlatin'
            onChange={(e) => setBird({ ...bird, latinName: e.target.value })}
          />

          <label htmlFor='chargealaire'>Charge alaire</label>
          <input
            type='chargealaire'
            name='chargealaire'
            id='chargealaire'
            onChange={(e) => setBird({ ...bird, charge: e.target.value })}
          />

          <label htmlFor='poids'>Poids</label>
          <input
            type='text'
            name='poids'
            id='poids'
            onChange={(e) => setBird({ ...bird, weight: e.target.value })}
          />

          <label htmlFor='adiposité'>Adiposité</label>
          <input
            type='text'
            name='adiposité'
            id='adiposité'
            onChange={(e) => setBird({ ...bird, adiposity: e.target.value })}
          />

          <label htmlFor='sex'>Sexe</label>
          <select
            name='sex'
            id='sex'
            onChange={(e) => setBird({ ...bird, sex: e.target.value })}>
            <option value=''>Choisir une option</option>
            <option value='mâle'>Mâle</option>
            <option value='femelle'>Femelle</option>
          </select>

          <label htmlFor='age'>Âge</label>
          <input
            type='text'
            name='age'
            id='age'
            onChange={(e) => setBird({ ...bird, age: e.target.value })}
          />
        </fieldset>

        <button>Ajouter</button>
      </form>
    </Fragment>
  )
}
