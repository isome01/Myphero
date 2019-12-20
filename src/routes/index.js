import React from 'react'
import {Route} from 'react-router-dom'
import SessionOrganizerDash from '../app/SessionOrganizerDash'
import Login from '../app/Login'

const routes = props => ([
  <Route path='/' key='session-organizer-dash' component={props => <SessionOrganizerDash {...props} />} exact />,
  <Route path='/login' key='main-login' component={props => <Login {...props} />} />
])

export default routes