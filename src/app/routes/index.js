import React from 'react'
import {Route} from 'react-router-dom'
import SessionOrganizerDash from '../SessionOrganizerDash'

const routes = [
  <Route path='/' key='session-organizer-dash' component={props => <SessionOrganizerDash {...props} />}>
  </Route>
]

export default routes