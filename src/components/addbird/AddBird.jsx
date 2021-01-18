import React, { Fragment, useContext, useState } from 'react'

export default function AddBird() {
  const [bird, setBird] = useState({})
  console.log(bird)
  return (
    <Fragment>
      <h2>Ajouter un oiseau</h2>
      <form>
        <fieldset>
          <legend>Informations générales</legend>
          <label for='nom'>Nom</label>
          <input
            type='text'
            name='nom'
            id='nom'
            onChange={(e) => setBird({ ...bird, name: e.target.value })}
          />

          <label for='lieu'>Lieu</label>
          <input
            type='text'
            name='lieu'
            id='lieu'
            onChange={(e) => setBird({ ...bird, place: e.target.value })}
          />

          <label for='date'>Date</label>
          <input
            type='date'
            name='date'
            id='date'
            onChange={(e) => setBird({ ...bird, date: e.target.value })}
          />

          <label for='technique'>Technique</label>
          <select
            name='technique'
            id='technique'
            onChange={(e) => setBird({ ...bird, technique: e.target.value })}>
            <option value=''>Choisir une option</option>
            <option value='filet'>Filet</option>
            <option value='piege'>Piége</option>
          </select>

          <label for='numero'>Numéro de bague</label>
          <input
            type='text'
            name='numero'
            id='numero'
            onChange={(e) => setBird({ ...bird, ringNumber: e.target.value })}
          />
        </fieldset>

        <fieldset>
          <legend>Informations à propos de la prise</legend>

          <label for='nomlatin'>Nom Latin</label>
          <input
            type='text'
            name='nomlatin'
            id='nomlatin'
            onChange={(e) => setBird({ ...bird, latinName: e.target.value })}
          />

          <label for='chargealaire'>Charge alaire</label>
          <input
            type='chargealaire'
            name='chargealaire'
            id='chargealaire'
            onChange={(e) => setBird({ ...bird, charge: e.target.value })}
          />

          <label for='poids'>Poids</label>
          <input
            type='text'
            name='poids'
            id='poids'
            onChange={(e) => setBird({ ...bird, wheight: e.target.value })}
          />

          <label for='adiposité'>Adiposité</label>
          <input
            type='text'
            name='adiposité'
            id='adiposité'
            onChange={(e) => setBird({ ...bird, adiposity: e.target.value })}
          />

          <label for='sexe'>Sexe</label>
          <input
            type='text'
            name='sexe'
            id='sexe'
            onChange={(e) => setBird({ ...bird, sex: e.target.value })}
          />

          <label for='age'>Âge</label>
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
