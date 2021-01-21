import React, { Fragment, useContext, useState } from 'react'
import firebase from '../../utils/firebaseConfig'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import { Redirect } from 'react-router-dom'
import * as geolib from 'geolib'
import '../styles/addBird.css'
export default function AddBird() {
  const [submited, setSubmited] = useState()
  const [defError, setDefError] = useState()
  let error, geolocError

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

  const errorHandler = (locError) => {
    geolocError = locError
  }

  const geolocate = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(setLocation, errorHandler)
  }

  if (!bird.date) {
    let currentDate = new Date().toISOString().slice(0, 10)
    setBird({ ...bird, date: currentDate })
  }
  const inputValidation = () => {
    if (!bird.name) {
      setDefError("Entrez un nom d'oiseau.")
    } else if (!bird.place) {
      setDefError('Entrez des coordonnées géographiques.')
    } else if (bird.place && !bird.place.longitude) {
      setDefError('Entrez une longitude.')
    } else if (bird.place && !bird.place.latitude) {
      setDefError('Entrez une latitude.')
    } else if (!bird.technique) {
      setDefError('Selectionnez une technique.')
    } else if (!bird.ringNumber) {
      setDefError('Entrez un numéro de bague.')
    } else if (!bird.latinName) {
      setDefError("Entrez le nom latin de l'oiseau.")
    } else if (!bird.charge) {
      setDefError('Entrez une valeure valide pour la charge calaire')
    } else if (!bird.weight) {
      setDefError('Entrez une valeure valide pour le poids')
    } else if (!bird.adiposity) {
      setDefError("Entrez une valeure valide pour l'adiposité")
    } else if (!bird.sex) {
      setDefError('Selectionnez un sexe.')
    } else if (!bird.age) {
      setDefError("Entrez l'âge.")
    } else {
      firebase.database().ref(`users/${currentUser.uid}/captures`).push(bird)
      setSubmited(true)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await inputValidation()
  }

  if (submited) {
    return <Redirect to={{ pathname: '/' }} />
  }
  return (
    <Fragment>
      <h2>Ajouter un oiseau</h2>
      {defError ? (
        <p className='alert'>
          <i>{defError}</i>
        </p>
      ) : null}

      <form className='addBirdForm' onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>Informations générales</legend>
          <div>
            <label htmlFor='nom'>Nom</label>
            <input
              type='text'
              name='nom'
              id='nom'
              onChange={(e) => setBird({ ...bird, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              onChange={(e) => setBird({ ...bird, date: e.target.value })}
            />
          </div>
          <fieldset className='placeForm'>
            <legend>Lieu</legend>
            {geolocError ? <p>geolocError</p> : null}
            <div>
              <label htmlFor='longitude'>Longitude</label>
              <input
                type='text'
                name='longitude'
                id='longitude'
                placeholder={currentPosition ? currentPosition.longitude : ''}
                onChange={(e) =>
                  setBird({
                    ...bird,
                    place: {
                      ...bird.place,
                      longitude: parseFloat(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div>
              <label htmlFor='latitude'>Latitude</label>
              <input
                type='text'
                name='latitude'
                id='latitude'
                placeholder={currentPosition ? currentPosition.latitude : ''}
                onChange={(e) =>
                  setBird({
                    ...bird,
                    place: {
                      ...bird.place,
                      latitude: parseFloat(e.target.value),
                    },
                  })
                }
              />
            </div>
            <a href='#' className='buttonLink' onClick={(e) => geolocate(e)}>
              Géolocaliser
            </a>
          </fieldset>

          <div>
            <label htmlFor='technique'>Technique</label>
            <select
              name='technique'
              id='technique'
              onChange={(e) => setBird({ ...bird, technique: e.target.value })}>
              <option value=''>Choisir une option</option>
              <option value='filet'>Filet</option>
              <option value='piege'>Piége</option>
            </select>
          </div>

          <div>
            <label htmlFor='numero'>Numéro de bague</label>
            <input
              type='text'
              name='numero'
              id='numero'
              onChange={(e) => setBird({ ...bird, ringNumber: e.target.value })}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Informations à propos de la prise</legend>

          <div>
            <label htmlFor='nomlatin'>Nom Latin</label>
            <input
              type='text'
              name='nomlatin'
              id='nomlatin'
              onChange={(e) => setBird({ ...bird, latinName: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor='chargealaire'>Charge alaire</label>
            <input
              type='chargealaire'
              name='chargealaire'
              id='chargealaire'
              onChange={(e) =>
                setBird({ ...bird, charge: parseFloat(e.target.value) })
              }
            />
          </div>

          <div>
            <label htmlFor='poids'>Poids</label>
            <input
              type='text'
              name='poids'
              id='poids'
              onChange={(e) =>
                setBird({ ...bird, weight: parseFloat(e.target.value) })
              }
            />
          </div>

          <div>
            <label htmlFor='adiposité'>Adiposité</label>
            <input
              type='text'
              name='adiposité'
              id='adiposité'
              onChange={(e) =>
                setBird({ ...bird, adiposity: parseFloat(e.target.value) })
              }
            />
          </div>

          <div>
            <label htmlFor='sex'>Sexe</label>
            <select
              name='sex'
              id='sex'
              onChange={(e) => setBird({ ...bird, sex: e.target.value })}>
              <option value=''>Choisir une option</option>
              <option value='mâle'>Mâle</option>
              <option value='femelle'>Femelle</option>
            </select>
          </div>

          <div>
            <label htmlFor='age'>Âge</label>
            <input
              type='text'
              name='age'
              id='age'
              onChange={(e) =>
                setBird({ ...bird, age: parseFloat(e.target.value) })
              }
            />
          </div>
        </fieldset>

        <button>Ajouter</button>
      </form>
    </Fragment>
  )
}
