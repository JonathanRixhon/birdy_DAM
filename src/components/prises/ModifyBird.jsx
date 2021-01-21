import React, { Fragment, useContext, useState } from 'react'
import firebase from '../../utils/firebaseConfig'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import { PrisesContext } from '../../contexts/PrisesContext'
import { Redirect, useLocation } from 'react-router-dom'
import * as geolib from 'geolib'

export default function AddBird() {
  let geolocError

  const bird = useLocation().state.bird
  const [defError, setDefError] = useState()
  const [submited, setSubmited] = useState()
  const [currentUser, setCurrentUser] = useContext(UserAuthContext)
  const [currentPosition, setCurrentPosition] = useState()
  const [updatedBird, setUpdatedBird] = useState({ ...bird, id: {} })
  const setLocation = (position) => {
    if (position) {
      let tempPosition = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      }
      setCurrentPosition(tempPosition)
      setUpdatedBird({ ...updatedBird, place: tempPosition })
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
    setUpdatedBird({ ...updatedBird, date: currentDate })
  }
  const inputValidation = () => {
    if (!updatedBird.name) {
      setDefError("Entrez un nom d'oiseau.")
    } else if (!updatedBird.place) {
      setDefError('Entrez des coordonnées géographiques.')
    } else if (updatedBird.place && !updatedBird.place.longitude) {
      setDefError('Entrez une longitude.')
    } else if (updatedBird.place && !updatedBird.place.latitude) {
      setDefError('Entrez une latitude.')
    } else if (!updatedBird.technique) {
      setDefError('Selectionnez une technique.')
    } else if (!updatedBird.ringNumber) {
      setDefError('Entrez un numéro de bague.')
    } else if (!updatedBird.latinName) {
      setDefError("Entrez le nom latin de l'oiseau.")
    } else if (!updatedBird.charge) {
      setDefError('Entrez une valeure valide pour la charge calaire')
    } else if (!updatedBird.weight) {
      setDefError('Entrez une valeure valide pour le poids')
    } else if (!updatedBird.adiposity) {
      setDefError("Entrez une valeure valide pour l'adiposité")
    } else if (!updatedBird.sex) {
      setDefError('Selectionnez un sexe.')
    } else if (!updatedBird.age) {
      setDefError("Entrez l'âge.")
    } else {
      firebase
        .database()
        .ref(`users/${currentUser.uid}/captures/${bird.id}`)
        .update(updatedBird)
      setSubmited(true)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await inputValidation()
  }

  if (submited) {
    return <Redirect to={{ pathname: '/mes_prises' }} />
  }
  return (
    <Fragment>
      <h2>Ajouter un oiseau</h2>
      {defError ? (
        <p>
          <i>{defError}</i>
        </p>
      ) : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>Informations générales</legend>
          <label htmlFor='nom'>Nom</label>
          <input
            type='text'
            name='nom'
            id='nom'
            placeholder={bird.name}
            onChange={(e) =>
              setUpdatedBird({ ...updatedBird, name: e.target.value })
            }
          />
          <fieldset>
            <legend>Lieu</legend>
            {geolocError ? <p>geolocError</p> : null}
            <label htmlFor='longitude'>Longitude</label>
            <input
              type='text'
              name='longitude'
              id='longitude'
              placeholder={updatedBird.place.longitude}
              onChange={(e) =>
                setUpdatedBird({
                  ...updatedBird,
                  place: {
                    ...updatedBird.place,
                    longitude: parseFloat(e.target.value),
                  },
                })
              }
            />
            <label htmlFor='latitude'>Latitude</label>
            <input
              type='text'
              name='latitude'
              id='latitude'
              placeholder={updatedBird.place.latitude}
              onChange={(e) =>
                setUpdatedBird({
                  ...updatedBird,
                  place: {
                    ...updatedBird.place,
                    latitude: parseFloat(e.target.value),
                  },
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
            value={bird.date}
            onChange={(e) =>
              setUpdatedBird({ ...updatedBird, date: e.target.value })
            }
          />

          <label htmlFor='technique'>Technique</label>
          <select
            name='technique'
            id='technique'
            onChange={(e) =>
              setUpdatedBird({ ...updatedBird, technique: e.target.value })
            }>
            <option value={bird.technique}>{bird.technique}</option>
            <option value='filet'>Filet</option>
            <option value='piege'>Piége</option>
          </select>

          <label htmlFor='numero'>Numéro de bague</label>
          <input
            type='text'
            name='numero'
            id='numero'
            placeholder={bird.ringNumber}
            onChange={(e) =>
              setUpdatedBird({ ...updatedBird, ringNumber: e.target.value })
            }
          />
        </fieldset>

        <fieldset>
          <legend>Informations à propos de la prise</legend>

          <label htmlFor='nomlatin'>Nom Latin</label>
          <input
            type='text'
            name='nomlatin'
            id='nomlatin'
            placeholder={bird.latinName}
            onChange={(e) =>
              setUpdatedBird({ ...updatedBird, latinName: e.target.value })
            }
          />

          <label htmlFor='chargealaire'>Charge alaire</label>
          <input
            type='chargealaire'
            name='chargealaire'
            id='chargealaire'
            placeholder={bird.charge}
            onChange={(e) =>
              setUpdatedBird({
                ...updatedBird,
                charge: parseFloat(e.target.value),
              })
            }
          />

          <label htmlFor='poids'>Poids</label>
          <input
            type='text'
            name='poids'
            id='poids'
            placeholder={bird.weight}
            onChange={(e) =>
              setUpdatedBird({
                ...updatedBird,
                weight: parseFloat(e.target.value),
              })
            }
          />

          <label htmlFor='adiposité'>Adiposité</label>
          <input
            type='text'
            name='adiposité'
            id='adiposité'
            placeholder={bird.adiposity}
            onChange={(e) =>
              setUpdatedBird({
                ...updatedBird,
                adiposity: parseFloat(e.target.value),
              })
            }
          />

          <label htmlFor='sex'>Sexe</label>
          <select
            name='sex'
            id='sex'
            onChange={(e) =>
              setUpdatedBird({ ...updatedBird, sex: e.target.value })
            }>
            <option value={bird.sex}>{bird.sex}</option>
            <option value='mâle'>Mâle</option>
            <option value='femelle'>Femelle</option>
          </select>

          <label htmlFor='age'>Âge</label>
          <input
            placeholder={bird.age}
            type='text'
            name='age'
            id='age'
            onChange={(e) =>
              setUpdatedBird({
                ...updatedBird,
                age: parseFloat(e.target.value),
              })
            }
          />
        </fieldset>

        <button>Modifier</button>
      </form>
    </Fragment>
  )
}
