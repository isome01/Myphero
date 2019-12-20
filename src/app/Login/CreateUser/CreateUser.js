import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import Modal from '../../common/Modal'
import {
  isValidName,
  isValidPwd,
  isValidEmail
} from '../validators'
import {
  createNewUser,isUsernameAvailable, isEmailAvailable} from '../api'
import {toast} from 'react-toastify'
import * as styles from './CreateUser.module.css'

const CreateUser = ({currentValues, setValue, initialValues, setInitialValues, className}) => {
  /* create user vars */
  const [modal, showModal] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [validPassword, setValidPassword] = React.useState(true)
  const [validUsername, setValidUsername] = React.useState(true)
  const [validEmailId, setValidEmailId] = React.useState(true)

  /*
  * Validation methods
  */

  const isFormValid = React.useCallback(() => (
    validUsername && validPassword && validEmailId
  ), [currentValues, validUsername, validPassword, validEmailId, setErrorMsg])

  // Whenever the user submits their data...
  const onSubmit = React.useCallback(() => {
    if (!isFormValid()) {
      if (!errorMsg)
        setErrorMsg('Assure all fields are entered correctly')
      return
    }
    const values = currentValues.toJS()
    const {username, password, emailId} = values
    /* if all checks out, make api call */
    createNewUser({username, password, emailId})
      .then(res => {
        if (res.success) {
          setInitialValues({username: res.username, password: ''})
          setTimeout(() => showModal(false), 1000)
        } else {
          setErrorMsg(`${res.message}`)
        }
      })
      .catch(err => {
        toast.error(err)
        console.log(err)
      })
  }, [currentValues, setErrorMsg, isFormValid, showModal, errorMsg])

  //initialize
  React.useEffect(() => {
    setInitialValues({
      age: '',
      emailId: '',
      confirmEmail: '',
      username: '',
      password: '',
      confirmPassword: ''
    })
  }, [setInitialValues])

  // Test password validity
  React.useEffect(() => {
    const password = currentValues.get('password')
    if (password) {
      const touched = password !== initialValues.get('password')
      const passwordConfirmed = (
        !touched || touched && (password === currentValues.get('confirmPassword'))
      )
      /* if password is too low or too great in characters */
      if (touched && !isValidPwd(password)) {
        setErrorMsg('Password does not meet length criteria.')
        setValidPassword(false)
      } else if (!passwordConfirmed) {
        setErrorMsg('Passwords entered do not match.')
        setValidPassword(false)
      } else {
        setErrorMsg('')
        setValidPassword(true)
      }
    }
  }, [setValidPassword, isValidPwd, currentValues, initialValues, validPassword])

  //Test username validity
  React.useEffect(() => {
    const username = currentValues.get('username', '')
    if (username) {
      const touched = username !== initialValues.get('username', '')
      /* if username is too great or too low in characters */
      if (touched && !isValidName(username)) {
        setErrorMsg('Username does not meet length criteria')
        setValidUsername(false)
      } else {
        if (validUsername) return
        /* if username is taken */
        isUsernameAvailable(username)
          .then(res => {
            setErrorMsg(!res ? 'Username is unavailable.' : '')
            setValidUsername(res)
          })
      }
    }
  }, [isValidName, currentValues, initialValues, setValidUsername, initialValues, validUsername])

  //Test email id validity
  React.useEffect(() => {
    const emailId = currentValues.get('emailId', '')
    if (emailId) {
      const touched = emailId !== initialValues.get('emailId', '')
      const emailConfirmed = (
        !touched || (touched && currentValues.get('emailId', '') === currentValues.get('confirmEmail'))
      )
      // if email is invalid
      if (touched && !isValidEmail(emailId)) {
        setErrorMsg('Email entered is invalid.')
        setValidEmailId(false)
      } else if (!emailConfirmed) {
        setErrorMsg('Emails entered do not match.')
        setValidEmailId(false)
      } else {
        /* if email is taken */
        if (validEmailId) return

        isEmailAvailable(emailId)
          .then(res => {
            setErrorMsg(!res ? 'Email is already in use.' : '')
            setValidEmailId(res)
          })
      }
    }
  }, [isValidEmail, setValidEmailId, currentValues, initialValues, setErrorMsg, validEmailId])

  const invalidClass = 'invalid'

  return (
    <Fragment>
      {modal &&
        <Modal
          title='Sign Me Up!'
          handleHide={() => showModal(false)}
          large={false}
        >
          <div className='label-input'>
            <label className='col-sm-3'>Email</label>
            <input
              type='input'
              onChange={e => setValue('emailId', e.target.value)}
              value={currentValues.get('emailId', '')}
              className={`col-sm-9 ${!validEmailId ? invalidClass : ''}`}
              required
            />
          </div>
          <div className='label-input'>
            <label className='col-sm-3'>Confirm Email</label>
            <input
              type='input'
              onChange={e => setValue('confirmEmail', e.target.value)}
              value={currentValues.get('confirmEmail', '')}
              className='col-sm-9'
              required
            />
          </div>
          <div className='label-input'>
            <label className='col-sm-3'>Username</label>
            <input
              type='input'
              onChange={e => setValue('username', e.target.value)}
              value={currentValues.get('username', '')}
              className={`col-sm-9 ${!validUsername ? invalidClass : ''}`}
              required
            />
          </div>
          <div className='label-input'>
            <label className='col-sm-3'>Password</label>
            <input
              type='password'
              onChange={e => setValue('password', e.target.value)}
              value={currentValues.get('password', '')}
              className={`col-sm-9 ${!validPassword ? invalidClass : ''}`}
              required
            />
          </div>
          <div className='label-input'>
            <label className='col-sm-3'>Confirm Password</label>
            <input
              type='password'
              onChange={e => setValue('confirmPassword', e.target.value)}
              value={currentValues.get('confirmPassword', '')}
              className='col-sm-9'
              required
            />
          </div>
          <div className='label-input col-sm-6' style={{padding: 20}}>
            <button
              className='btn btn-primary'
              onClick={onSubmit}
              disabled={currentValues.equals(initialValues)}
            >
              Confirm
            </button>
          </div>
          <div className='label-input col-sm-6'>
            <div className='pull-right'>
              <p className={errorMsg ? 'error-msg' : ''}>
                {errorMsg}
              </p>
            </div>
          </div>
        </Modal>
      }
      <button
        type='button'
        onClick={() => showModal(true)}
        className={`btn btn-primary ${className}`}
      >
        (Not a member?) Sign Up
      </button>
    </Fragment>
  )
}

CreateUser.propTypes = {
  currentValues: PropTypes.instanceOf(Map).isRequired,
  initialValues: PropTypes.instanceOf(Map).isRequired,
  setValue: PropTypes.func.isRequired,
  setInitialValues: PropTypes.func.isRequired,
  className: PropTypes.string
}

CreateUser.defaultProps = {
  className: '',
}

export default CreateUser
