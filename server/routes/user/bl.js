/* business layer logic for users */
import {
  isValidName,
  isValidEmail,
  isValidPwd
} from '../../js/validators'
import {List, fromJS} from 'immutable'
import user from '../../js/obj/user'
import dal from './dal'

//our nice little business layer
const bl = {}

// vars for keeping running totals of lists and what not
let allUsernames = List()
let allEmailIds = List()

export const getAllEmailIds = () => {
  //if email ids have not yet been populated, then do just that.
  if  (allEmailIds.size < 1) {
    return bl.getAllEmailIds()
      .then(res => {
        allEmailIds = fromJS([...res.sort()])
        console.log(allEmailIds.toJS())
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
  } else {
    return Promise.resolve(true)
  }
}

export const getAllUsers = () => {
  //if usernames have not been populated, samely... populate.
  if (allUsernames.size < 1) {
    return bl.getAllAccountNames()
      .then(res => {
        allUsernames = fromJS([...res.sort()])
        console.log(allUsernames.toJS())
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
  } else {
    return Promise.resolve(true)
  }
}

/*
*BL for typeaheads
*/

bl.getAllEmailIds = () => (
  dal.getAllEmailIds()
    .then(res => res)
    .catch(err => err)
)

bl.getAllAccountNames = () => (
  dal.getAllAccountNames()
    .then(res => res)
    .catch(err => err)
)

bl.usernameAvailable = name => (
  (allUsernames.size < 1) || allUsernames.some(username => username !== name)
)

bl.emailIdAvailable = id => (
  (allEmailIds.size < 1) || allEmailIds.some(emailId => emailId !== id)
)

// BL for basic CRUD operations

bl.createUser = values => {
  return getAllUsers()
  /* test username availibility */
    .then(
      (res) => {
        if (!bl.usernameAvailable(values.username)) {
          return ({
            message: 'Username is already taken',
            success: false
          })
        }

        return getAllEmailIds()
        //resolve for valid emails
          .then(
            res => {
              if (!bl.emailIdAvailable(values.emailId)) {
                return ({message: 'That email is already in use.', success: false})
              }
              // test valid passowrd and email
              if (isValidPwd(`${values.password}`) && isValidEmail(`${values.emailId}`)) {
                console.log('passes all inspections...')
                return dal.createUser(user({...values}))
                  .then(res => res)
                  .catch(err => err)
              }

              return Promise.reject(() => ({
                message: 'Password or email is not valid. Fix these to continue the process.',
                success: false
              }))
            }
          )
          .catch(
            err => {
              console.log(err)
            }
          )
      }
    )
    .catch(err => console.log(err))
}

bl.getUser = user => {
  /* Make all sorts of authentication checks */

}

export default bl