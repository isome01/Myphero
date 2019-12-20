import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {fromJS, Map} from 'immutable'

const useForm = (values = {}) => {
  if (typeof (values) !== 'object') {
    throw new Error('Initial values type should be either a javascript object or Map.')
  }

  const [currentValues, setValues] = useState(Map())
  const [initialValues, setInitialValues] = useState(Map())
  const setValue = useCallback((key = '', value = '') => {
    const values  = (currentValues || Map()).toJS()
    setValues(fromJS({...values, [key]: value}))
  }, [setValues, currentValues])

  const initialize = useCallback((initialValues = {}) => {
    const values = {}
    const keys = [...(fromJS(initialValues || {}).keys())]
    keys.forEach(key => {
      values[String(key)] = initialValues[key]
    })
    setInitialValues(fromJS({...values}))
    setValues(fromJS({...values}))
  }, [setInitialValues, setValues])

  const isDirty = !(initialValues.equals(currentValues))

  return {
    currentValues,
    setValue,
    setValues,
    initialValues,
    setInitialValues: initialize,
    isDirty
  }
}

export {
  useForm
}