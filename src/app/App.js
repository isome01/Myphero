import React, {Component, Fragment} from 'react'
import {BrowserRouter, Switch, Route, useHistory} from 'react-router-dom'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import PageBackground from './common/PageBackground'
import MainNavbar from './Navigation/components/MainNavbar'
import navConfig from '../config/navigationConfig'
import browserStorage from '../config/browserStorage'

const backgroundUrl = 'https://www.xmple.com/wallpaper/grey-white-checkered-squares-1920x1080-c2-a9a9a9-ffffff-l-70-a-0-f-2.svg'

const App = ({appEssentials, routes}) => {
  return (
    <>
      <BrowserRouter history={browserHistory}>
        <div id='app-root' className='main'>
          <PageBackground url={backgroundUrl} />
          <MainNavbar
            id='myphero-nav'
            navLogoText='Myphero'
            navContent={navConfig}
            className=''
          />
          <Switch>
            {routes({appEssentials})}
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}

App.propTypes = {
  appEssentials: PropTypes.instanceOf(Map),
  routes: PropTypes.func.isRequired
}

export default App