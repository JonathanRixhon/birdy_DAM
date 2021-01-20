import React from 'react'
import { Link } from 'react-router-dom'
import EncycloImg from './EncycloImg'
import Systematique from './Systematique'

export default function EncycloItemList(props) {
	const bird = props.infos
	const aboutImg = {
		name: bird.url,
		description: bird.altImg,
		page: 'encyclopedie',
		width: 208,
	}
	return (
		<li>
			<h3>{bird.name}</h3>
			<EncycloImg infos={aboutImg} />
			<Systematique data={bird} />
			<Link
				to={{
					pathname: `/encyclopedie/${bird.id}`,
					state: { index: props.birdIndex },
				}}>
				En savoir plus
			</Link>
		</li>
	)
}
