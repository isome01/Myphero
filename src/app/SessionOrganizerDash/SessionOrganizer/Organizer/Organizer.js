import React from 'react'
import {List} from 'immutable'
import PropTypes from 'prop-types'
import * as style from './Organizer.module.css'

const Organizer = ({}) => {
  const [data, setData] = React.useState(List())
  
  return (
    <div className='row'>
      <div className='organizer col-sm-8 col-sm-offset-2'>
        <h3 className='text-center'>Welcome to the Game!</h3>
        <table>
          <tbody>
            <tr className='row'>
              <th>Participant</th>
              <th>Date of joining</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

Organizer.propTypes = {

}

export default Organizer