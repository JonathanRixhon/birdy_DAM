import React, { Fragment, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { EncycloContext } from '../../contexts/EncycloContext'
import EncycloImg from './EncycloImg'
import Systematique from './Systematique'

export default function SingleBird() {
  const [encyclopedie, setEncyclopedie] = useContext(EncycloContext)
  const birdIndex = useLocation().state.index
  let aboutBird, aboutImg
  if (encyclopedie[0]) {
    console.log(encyclopedie)
    aboutBird = encyclopedie[birdIndex]
    aboutImg = {
      name: aboutBird.url,
      description: aboutBird.altImg,
      page: 'encyclopedie',
      width: 440,
    }
  }

  /* l'encyclopedie est undefined apre un reload. pourquoi ? */
  const category = 'encyclopedie'
  return (
    <main className='singleBird'>
      {encyclopedie[0] ? (
        <Fragment>
          <h2>Encyclopedie</h2>
          <section>
            <h3>{aboutBird.name}</h3>
            <article className='systematique'>
              <h4 className='visually-hidden'>Systématique</h4>
              <Systematique data={aboutBird} />
            </article>
            <EncycloImg infos={aboutImg} />
            <article className='description'>
              <h4 className='visually-hidden'>Informations</h4>
              <p>{aboutBird.description}</p>
            </article>
          </section>
        </Fragment>
      ) : (
        <Fragment>
          <h2>Encyclopedie</h2>
          <h3>Chargement</h3>
        </Fragment>
      )}
    </main>
  )
}
