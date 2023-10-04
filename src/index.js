import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './components/App'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay, faPause)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
