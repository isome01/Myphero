import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as styles from './MainNavbar.module.css'

const MainNavbar = ({id, className, style, navLogoImg, navLogoText, navContent}) => {

  const resetActive = () => {
  }

  const [selectedChild, getSelectedChild] = useState(null)
  return (
    <Fragment>
        <nav
          className={`main-navbar navbar navbar-expand-md navbar-expand-sm ${className}`}
          style={{...style}}
        >
          {/* Navbar header */}
          <div className='navbar-header'>
            <Link to='/'>
              <span className='nav-header navbar-brand'>
                {(navLogoImg &&
                  <img src={navLogoImg} alt={navLogoText} className='nav-logo'/>
                  ) || (
                  navLogoText
                )}
              </span>
            </Link>
          </div>
          {/* navbar toggler: for mobile view */}
          <div className='' style={{width: 75}}>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target={`#${id.replace(/ /g, '-')}`}
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='hztlNavButton'
            >
              <span className='navbar-toggler-icon'/>
            </button>
          </div>
          {/* Our precious little links */}
          <div id={id.replace(/ /g, '-')} className='collapse navbar-collapse nav-content' style={{width: '100%'}}>
            <ul className='navbar-nav' style={{display: 'flex', justifyContent: 'center', width: '100%', marginLeft: 50, marginRight: 50}}>
              {(navContent || []).map((content, i) => (
                <Fragment key={`${content.text || ''}-${i}`}>
                  {/*<div className='nav-separator text-center'>|</div>*/}
                  <li
                    onMouseOver={() => getSelectedChild(content.children)}
                    onClick={content.children ? null : resetActive}
                  >
                    <Link
                      to={content.link || '#'}
                      className='nav-item'
                    >{content.text && content.text}
                    </Link>
                  </li>
                </Fragment>
              ))}
            </ul>
            <span className='nav-login'>
              <Link to='/login' className='nav-item'>
                Login
              </Link>
            </span>
          </div>
        </nav>
        {
          selectedChild &&
          <div
            onMouseLeave={() => getSelectedChild(null)}
            className='child-content'>
            {selectedChild}
          </div>
        }
    </Fragment>
  )
}

MainNavbar.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  navLogoImg: PropTypes.string,
  navLogoText: PropTypes.string.isRequired,
  navContent: PropTypes.arrayOf(
    PropTypes.shape({
        link: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        children: PropTypes.any
    }).isRequired
  ).isRequired,
  style: PropTypes.object
}

MainNavbar.propTypes = {
  style: {},
  className: ''
}

export default MainNavbar
