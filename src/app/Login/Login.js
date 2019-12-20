import React from 'react'
import PropTypes from 'prop-types'
import {Map, fromJS} from 'immutable'
import {useForm} from '../../hooks'
import * as styles from './Login.module.css'
import CreateUser from './CreateUser/CreateUser'

const Login = ({appEssentials}) => {
  const {currentValues, initialValues, setValue, isDirty, setInitialValues} = useForm()

  const onSubmit = React.useCallback(e => {
    e.preventDefault()
  }, [])

  React.useEffect(() => {
    /* initialize */
    setInitialValues({
      username: '',
      password: ''
    })
  }, [])

  return (
    <div className='col-sm-4 offset-sm-4 login-form'>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <label>Email address (or username)</label>
          <input
            type='input'
            value={currentValues.get('username', '')}
            className='form-control'
            onChange={e => setValue('username', e.target.value)}
            autoComplete='true'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            value={currentValues.get('password', '')}
            onChange={e => setValue('password', e.target.value)}
          />
        </div>
        <div className='login-button-pane' style={{width: '100%'}}>
          <br />
          <br />
          <button
            type='submit'
            className='btn btn-primary'
            disabled={!isDirty}
          >
            Login
          </button>
          <CreateUser
            currentValues={currentValues}
            setValue={setValue}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            className='float-right'
          />
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  appEssentials: PropTypes.instanceOf(Map)
}

export default Login