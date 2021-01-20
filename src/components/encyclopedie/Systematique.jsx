import React from 'react'

export default function Systematique(props) {
	const bird = props.data
	return (
		<dl>
			<dt>Nom latin</dt>
			<dd>{bird.latinName}</dd>
			<dt>Ordre</dt>
			<dd>{bird.systematique.ordre}</dd>
			<dt>Famille</dt>
			<dd>{bird.systematique.famille}</dd>
			<dt>Genre</dt>
			<dd>{bird.systematique.genre}</dd>
			<dt>Espèce</dt>
			<dd>{bird.systematique.espece}</dd>
		</dl>
	)
}
