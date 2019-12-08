import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import SessionOrganizer from './SessionOrganizer'

class SessionOrganizerDash extends Component {
  static propTypes = {
    appEssentials: PropTypes.instanceOf(Map())
  }

  static defaultProps = {

  }

  state = {}

  render () {
    return (
      <SessionOrganizer />
    )
  }
}

export default SessionOrganizerDash