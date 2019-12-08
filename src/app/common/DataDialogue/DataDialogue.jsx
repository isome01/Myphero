import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import DataSpan from '../DataSpan'

class DataDialogue extends Component {
  static propTypes = {
    selectSpan: PropTypes.func.isRequired,
    dataTitles: PropTypes.array.isRequired,
    dialogueTitle: PropTypes.string.isRequired
  }

  static defaultProps = {
    dataTitles: []
  }

  render () {
    return (
      <Fragment>
        <div
          className='container-fluid'
          style={{
            padding: '30px 0',
            overflow: 'auto',
            maxHeight: 400
          }}
        >
          <h5>{this.props.dialogueTitle}</h5>
          <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
            {(this.props.dataTitles).map(data => {
              const title = data.title || data.header
              return (
                <div
                  key={`${title}`}
                  style={{
                    borderBottom: 'solid #eee 1px'
                  }}
                >
                  <DataSpan
                    children={(
                      <p style={{padding: '10px 0', cursor: 'pointer', color: '#1e416e'}}>
                        {title}
                      </p>
                    )}
                    selectSpan={this.props.selectSpan || null}
                    id={data._id}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default DataDialogue
