import ajax, {config} from '../../config/ajax'

const createNewUser = user => (
  ajax.post('/user', {user})
    .then(res => res.data)
)

const getUserLogin = user => (
  ajax.post(`/user/login/${user.username}`, {user})
    .then(res => res.data)
)

const isUsernameAvailable = typeahead => (
  ajax.get(`/user/email-valid/${typeahead}`)
    .then(res => res.data.valid)
)

const isEmailAvailable = typeahead => (
  ajax.get(`/user/user-valid/${typeahead}`)
    .then(res => res.data.valid)
)

export {
  createNewUser,
  isUsernameAvailable,
  isEmailAvailable
}
