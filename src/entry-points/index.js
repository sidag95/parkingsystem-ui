import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from '../app'

const NextApp = require('../routes').default

render(<NextApp />, document.getElementById('root'))