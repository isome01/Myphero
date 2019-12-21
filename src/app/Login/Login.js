import React from 'react'
import PropTypes from 'prop-types'
import {Map, fromJS} from 'immutable'
import {useForm} from '../../hooks'
import {getUserLogin} from './api'
import {browserStorage} from '../../config'
import CreateUser from './CreateUser/CreateUser'
import * as styles from './Login.module.css'

const Login = ({appEssentials}) => {
  const {currentValues, initialValues, setValue, isDirty, setInitialValues} = useForm()
  const [loading, setLoading] = React.useState(false)
  const [errormsg, setErrorMsg] = React.useState('')

  const onSubmit = React.useCallback(e => {
    e.preventDefault()
    //if bad credentials, just don't submit.
    const username = currentValues.get('username', '')
    const password = currentValues.get('password', '')
    if (!(username && password)) return

    setLoading(true)
    getUserLogin({username, password})
      .then(res => {
        setLoading(false)
        if (!res.success) {
          setErrorMsg(res.message)
        } else setErrorMsg('')
      })
      .catch(
        err => {
          setLoading(false)
          setErrorMsg(new Error(err))
        }
      )
  }, [currentValues, setLoading])

  const resetForm = React.useCallback(() => {
    setInitialValues({username: '', password: ''})
    setErrorMsg('')
  }, [setErrorMsg])

  React.useEffect(() => {
    /* initialize */
    setInitialValues({
      username: '',
      password: ''
    })
  }, [])

  return (
    <div className='col-sm-4 offset-sm-4 col-md-4 offset-md-4 login-form'>
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
        <div className='row text-center'>
          <div className='col-sm-12 col-xs-12 text-center'>
            {(errormsg &&
              <p className='error-msg'>{errormsg}</p>
            ) || (
              <>
                <br />
                <br />
              </>
            )}
          </div>
        </div>
        <div className='login-button-pane' style={{width: '100%'}}>
          <div className='row'>
            <div className='col-sm-6 col-xs-12'>
              <button
                type='submit'
                className='btn btn-primary float-left col-xs-12'
                disabled={!isDirty || loading}
              >
                Login
              </button>
            </div>
            <div className='col-sm-6' style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <CreateUser
                currentValues={currentValues}
                setValue={setValue}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                resetForm={resetForm}
                className='float-right'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  appEssentials: PropTypes.instanceOf(Map)
}

export default Login