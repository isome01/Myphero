import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../FormGroup/FormGroup.jsx'
import {ClipLoader} from 'react-spinners'

class Form extends Component {
  static propTypes = {
    currentData: PropTypes.object,
    hasFormData: PropTypes.bool,
    title: PropTypes.string.isRequired,
    toggleSubmit: PropTypes.func.isRequired,
    retrievingData: PropTypes.bool.isRequired,
    removeButton: PropTypes.bool,
    maxNoOfImages: PropTypes.number,
    inputFields: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        field: PropTypes.shape(
          {
            inputType: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
          }
        )
      })
    )
  }

  static defaultProps = {
    currentData: {},
    hasFormData: false,
    maxNoOfImages: 0
  }

  constructor(props){
    super(props)
    this.populateForm = this.populateForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.addMedia = this.addMedia.bind(this)
    this.onChange = this.onChange.bind(this)
    this.removeImg = this.removeImg.bind(this)
    this.errorMsg = this.errorMsg.bind(this)
    this.successMsg = this.successMsg.bind(this)
    this.state = {
      inputFields: [],
      replaceMedia: false
    }
  }

  componentWillMount() {
    //create individual ids for each field
    const {maxNoOfImages, hasFormData} = this.props
    this.setState({
      replaceMedia: (maxNoOfImages > 1 && hasFormData)
    })
    let inputFields = this.props.inputFields.map( (input, index) => {
      return ({
        key: input.key,
        field: {
          ...input.field,
          id: `${input.field['label']}${index}`}
      })
    })
    inputFields[inputFields.length] = {
      key: 'replaceMedia',
      field: {
        label: 'Replace current images?',
        inputType: 'checkbox',
        id: `Replace current images?${inputFields.length}`
      }
    }
    this.setState({inputFields: inputFields})
  }

  componentDidMount() {
    this.populateForm()
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.populateForm(nextProps.currentData)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {currentData} = this.props
    for (let k in currentData) {
      if (currentData[k] !== nextProps.currentData[k]) {
        return true
      }
    }
    return false
  }

  populateForm = data => {
    const currentData = data || this.props.currentData
    const {inputFields} = this.state
    for (let k in currentData) {
      inputFields.forEach(input => {
        let inputField = document.getElementById(input.field.id)
        if (inputField) {
          if (input.key === k) {
            if (inputField && inputField.type !== 'file') {
              inputField.value = currentData[k]
              inputField.name = currentData._id
            }
          } else if (input.key === 'replaceMedia') {
            inputField.name = 'replaceMedia'
          }
        }
      })
    }
  }

  successMsg = msg => {
    return (`<div
      class="col-md-auto text-center text-success"
      style="border: solid green 2px;border-radius: 5px;background-color: #bbbbff;padding: 20px"
      ></div>`)
  }

  errorMsg = msg => {
    return (`<div
      class="col-md-auto text-center text-danger"
      style="border: solid red 2px;border-radius: 5px;background-color: #ffbbbb;padding: 20px"
      >${msg}</div>`)
  }

  onChange = e => {
    const type = e.target.type
    switch(type){
      case 'checkbox':
        if (e.target.value === 'on') {
          e.target.value = 'checked'
        } else {
          e.target.value = 'unchecked'
        }
      default:
        return null
    }
  }

  addMedia = e => {
    const {maxNoOfImages} = this.props || 1
    if (document.getElementById(e.target.id).files.length <= maxNoOfImages) {
      const mediaRowId = `${e.target.id}-media-row`
      const files = e.target.files
      let mediaRow = document.getElementById(mediaRowId)
      mediaRow.innerHTML = ''

      const noOfFiles = files.length
      for(let i = 0;i < noOfFiles; i++) {

        let reader = new FileReader()

        reader.onload = e => {
          let div = document.createElement('div')
          div.innerHTML = `<div
            class="col-sm-12 text-center"
            id="${mediaRowId}-img-${mediaRow.childNodes.length+1}"
            style="word-break: break-all">${files[i].name}</div>`
          div.value = e.target.result
          div.name = files[i].name
          mediaRow.insertBefore(div, null)
        }

        reader.readAsDataURL(files[i])
      }
    } else {
      const mediaRow = document.getElementById(`${e.target.id}-media-row`)
      const div = document.createElement('div')
      mediaRow.innerHTML = ''
      div.innerHTML = this.errorMsg(`No more than ${this.props.maxNoOfImages} images allowed.`)
      mediaRow.insertBefore(div, null)
    }
  }

  removeImg = e => document.body.removeChild(e.target.id)

  submitForm = e => {
    e.preventDefault()
    const {inputFields} = this.state || []
    let inputValues = {}

    inputFields.forEach(input => {
      const field = document.getElementById(input.field.id)
      if (field) {
        if (field.type !== 'file') {
          inputValues[input.key] = field.value
          if (field.name && !inputValues['id']) {
            inputValues['id'] = field.name
          }
        } else if (field.type === 'file' && field.files[0]) {
          const mediaRow = document.getElementById(`${field.id}-media-row`).childNodes
          document.getElementById(`${field.id}-media-row`)
          if (mediaRow.length > 1) {
            console.log(mediaRow)
            mediaRow.forEach( media => {
              if (media.value && media.name) {
                inputValues[input.key] = inputValues[input.key] || []
                inputValues[input.key].push({
                  name: media.name,
                  value: media.value
                })
              }
            })
          } else {
            inputValues[input.key] = {
              name: mediaRow[0].name,
              value: mediaRow[0].value
            }
          }
        }
      }
    })
    const {dataObjectKey, api, action} = this.props
    this.props.toggleSubmit(inputValues, dataObjectKey, api, action)
  }

  render () {
    const {title} = this.props
    const {inputFields, replaceMedia} = this.state
    return (
      <form className="container-fluid" onSubmit={this.submitForm}>
        <h4>{title}</h4>
        <hr />
        {
          inputFields.map( (input, index) => {
            if (input.key !== 'replaceMedia' ||
            (input.key === 'replaceMedia' && replaceMedia)) {
              return (
                <Fragment key={input.field.id}>
                  <FormGroup
                    inputType={input.field.inputType}
                    label={input.field.label}
                    textArea={input.field.textArea}
                    id={input.field.id}
                    onChange={input.field.inputType === 'file' ? this.addMedia : this.onChange}
                    multiple={this.props.maxNoOfImages > 1}
                  />
                  {input.field.inputType === 'file' &&
                  <div
                    id={`${input.field.id}-media-row`}
                    className='row container-fluid'
                  />
                  }
                  <hr
                    style={index >= inputFields.length
                      ? {paddingBottom: 15}
                      : {width: '80%'}}
                  />
                </Fragment>)
            } return <div key={input.field.id} id={input.field.id} />
          })
        }
        <div className={"container"}>
          {
            (this.props.retrievingData &&
              <ClipLoader
                sizeUnit='px'
                size='50'
                color='#1e416e'
                loading={this.props.retrievingData}
              />
            ) || (!this.props.removeButton &&
              <button
                className={"btn btn-primary form-control col-md-6 col-md-offset-3 text-center"}
                type="submit"
                style={{maxWidth: 130}}
              >Submit</button>
            )
          }
        </div>
      </form>
    )
  }
}

export default Form
