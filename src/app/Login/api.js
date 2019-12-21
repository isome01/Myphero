import {ajax} from '../../config'

const createNewUser = user => (
  ajax.post('/user', {user})
    .then(res => res.data)
)

const getUserLogin = user => {
  const uri = encodeURI(`/user/login/authenticate?username=${user.username}&password=${user.password}`)
  return ajax.get(uri).then(res => res.data)
}

const isUsernameAvailable = typeahead => (
  ajax.get(`/user/email-valid/${typeahead}`)
    .then(res => res.data.data.valid)
)

const isEmailAvailable = typeahead => (
  ajax.get(`/user/user-valid/${typeahead}`)
    .then(res => res.data.data.valid)
)

export {
  createNewUser,
  isUsernameAvailable,
  isEmailAvailable,
  getUserLogin
}
