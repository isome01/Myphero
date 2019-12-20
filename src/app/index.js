import React from 'react'
import ReactDOM from 'react-dom'
//Import the main application
import App from './App.js'
import {fromJS} from 'immutable'
import appEssentials from '../config'

/* import our routes */
import routes from '../routes'

const appWrapper = document.getElementById('root')

appWrapper
  ? ReactDOM.render(
    <App
      appEssentials={appEssentials}
      routes={routes}
    />,
    appWrapper
  ) : () => console.log(`Error: Unable to render App. App value is ${appWrapper}`)
