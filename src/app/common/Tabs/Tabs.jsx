import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

const Tabs = ({navtabs, children, onClick}) => (
  <div className='container-fluid'>
    <div className='row'>
      <ul className='nav nav-tabs'>
        {navtabs.map((tab, i) => (
          <li key={`${tab.text}${i}`}
              className={`nav-item ${i === 0 ? 'active' : ''}`}
          ><Link
            className='nav-link'
            to={tab.link}
            onClick={onClick}
          >
            {tab.text}
          </Link></li>
        ))}
      </ul>
    </div>
    <div className='row'>{children}</div>
  </div>
)

Tabs.propTypes = {
  navtabs: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  children: PropTypes.any,
  onClick: PropTypes.func
}

export default Tabs
