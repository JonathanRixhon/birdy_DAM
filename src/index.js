import './reset.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { UserAuthProvider } from './contexts/UserAuthContext'

ReactDOM.render(<UserAuthProvider />, document.getElementById('root'))
