import React from 'react'
import {List} from 'immutable'
import PropTypes from 'prop-types'
import {test} from './api'
import * as style from './Organizer.module.css'

const Organizer = ({}) => {
  const [data, setData] = React.useState(List())

  React.useEffect(() => {
    test()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])
  
  return (
    <div className='row'>
      <div className='panel panel-default col-sm-8 col-sm-offset-2'>
        <div className='panel-heading'>
          <h3 className='text-center'>Welcome to the Game!</h3>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Participant</th>
              <th>Date of joining</th>
            </tr>
          </thead>
          <tbody>
            {data.map(datum => (<td>{datum.get('content', '')}</td>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Organizer.propTypes = {

}

export default Organizer