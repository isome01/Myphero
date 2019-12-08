import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const DataSpan = ({children, selectSpan, id}) => (
  <Fragment>
    <div
      className='col-sm-offset-1 col-sm-10 text-center'
      onClick={() => selectSpan(id)}
    >
      {children || 'DEFAULT'}
    </div>
    <div className='col-sm-1 text-danger'>
      <span
        className='glyphicon glyphicon-remove'
      />
    </div>
  </Fragment>
)

DataSpan.propTypes = {
  children: PropTypes.node,
  selectSpan: PropTypes.func,
  id: PropTypes.string
}

DataSpan.defaultProps = {

}

export default DataSpan
