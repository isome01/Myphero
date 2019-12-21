import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css' //required, sadly

const CustomLoader = ({type, style}) => {
  const {height = 25, width = 25, color = '#50c878'} = style
  return (
    <Loader
      type={type || 'Puff'}
      color={color}
      height={height}
      width={width}
    />
  )
}

CustomLoader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object
}

CustomLoader.defaultProps = {
  type: '',
  color: '',
  style: {}
}