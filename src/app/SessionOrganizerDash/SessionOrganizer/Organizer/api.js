import ajax from '../../../../config/ajax'

const test = () => (
  ajax.get('/test').then(res => res.data)
)

const getUsersBySession = () => null

export {test}