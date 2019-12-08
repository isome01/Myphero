import React, {Component, Fragment} from 'react'
import {BrowserRouter, Switch, Route, useHistory} from 'react-router-dom'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'

import './App.css'
import PageBackground from './common/PageBackground'

const backgroundUrl = 'https://www.xmple.com/wallpaper/grey-white-checkered-squares-1920x1080-c2-a9a9a9-ffffff-l-70-a-0-f-2.svg'

const App = ({appEssentials, routes}) => {
  console.log(appEssentials.get('backendUrl'))
  return (
    <>
      <BrowserRouter history={browserHistory}>
        <div id='app-root' className='main'>
          <PageBackground url={backgroundUrl} />
          <Switch>
            {routes.map( m => m)}
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}

App.propTypes = {

}

export default App