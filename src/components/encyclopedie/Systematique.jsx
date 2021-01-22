import React from 'react'

export default function Systematique(props) {
  const bird = props.data
  return (
    <dl>
      <dt className='visually-hidden'>Nom latin</dt>
      <dd className='latinName'>{bird.latinName}</dd>
      <dt className='visually-hidden'>Ordre</dt>
      <dd>{bird.systematique.ordre}</dd>
      <dt className='visually-hidden'>Famille</dt>
      <dd>{bird.systematique.famille}</dd>
      <dt className='visually-hidden'>Genre</dt>
      <dd>{bird.systematique.genre}</dd>
      <dt className='visually-hidden'>Espèce</dt>
      <dd>{bird.systematique.espece}</dd>
    </dl>
  )
}
