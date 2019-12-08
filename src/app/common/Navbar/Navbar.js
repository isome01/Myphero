import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as style from './Navbar.module.css'

const HorizontalNav = ({id, className, navLogoImg, navLogoText, navContent}) => {

  const resetActive = () => {
  }

  const [selectedChild, getSelectedChild] = useState(null)
  return (
    <Fragment>
        <nav className={`navbar navbar-expand-md`}>
          <div className='navbar-header col-xs-6'>
            <Link to="/">
              <span className='nav-header navbar-brand'>
                <img src={navLogoImg} alt={navLogoText} className='nav-logo'/>
              </span>
            </Link>
          </div>
          <div className='col-xs'>
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
          <div className={`${className}`}>
            <div id={id.replace(/ /g, '-')} className='collapse navbar-collapse' style={{width: '100%'}}>
              <ul className="navbar-nav">
                {(navContent || []).map((content, i) => (
                    <Fragment key={`${content.text || ''}-${i}`}>
                      <div className='nav-separator text-center'>|</div>
                      <li
                        onMouseOver={() => getSelectedChild(content.children)}
                        onClick={content.children ? null : resetActive}
                      >
                        <Link
                          to={content.link || '#'}
                          className='nav-item hrzl-nav-item'
                        >{content.text && content.text}
                        </Link>
                      </li>
                    </Fragment>
                  )
                )}
              </ul>
            </div>
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

HorizontalNav.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  navLogoImg: PropTypes.string,
  navLogoText: PropTypes.string.isRequired,
  navContent: PropTypes.arrayOf(
    PropTypes.shape(
      {
        link: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        children: PropTypes.any
      }
    ).isRequired
  ).isRequired,
}

export default HorizontalNav
