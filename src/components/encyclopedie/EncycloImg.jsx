import React, { useEffect, useState } from 'react'
import firebase from '../../utils/firebaseConfig'

export default function EncycloImg(props) {
  const [imgDisplayUrl, setImgDisplayUrl] = useState([])
  const aboutImg = props.infos
  const storageRef = firebase
    .storage()
    .ref(`/${aboutImg.page}/${aboutImg.name}`)
  storageRef.getDownloadURL().then((url) => setImgDisplayUrl(url))
  console.log(imgDisplayUrl)

  return <img src={imgDisplayUrl} alt={aboutImg.name} width={aboutImg.width} />
}
