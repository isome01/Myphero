/* business layer logic for users */
import {
  isValidName,
  isValidEmail,
  isValidPwd
} from '../../js/validators'
import {List, fromJS} from 'immutable'
import {user, returnObj} from '../../js/obj'
import dal from './dal'

//our nice little business layer
const bl = {}

// vars for keeping running totals of lists and what not
let allUsernames = List()
let allEmailIds = List()

export const getAllEmailIds = (repopulate = false) => {
  //if email ids have not yet been populated, then do just that.
  if  (allEmailIds.size < 1 || repopulate) {
    return bl.getAllEmailIds()
      .then(res => {
        const emailIds = res.data
          .sort()
          .map(id => String(id).toLocaleLowerCase())
        allEmailIds = fromJS(emailIds)
        console.log('BL email list', allEmailIds.toJS())
        return res.success
      })
      .catch(err => {
        console.log(err)
        return false
      })
  } else {
    return Promise.resolve().then(() => true)
  }
}

export const getAllUsers = (repopulate = false) => {
  //if usernames have not been populated, samely... populate.
  if (allUsernames.size < 1 || repopulate) {
    return bl.getAllAccountNames()
      .then(res => {
        const names = res.data
          .sort()
          .map(name => String(name).toLocaleLowerCase())
        allUsernames = fromJS(names)
        console.log('BL username list:', allUsernames.toJS())
        return res.success
      })
      .catch(err => {
        console.log(err)
        return false
      })
  } else {
    return Promise.resolve().then(() => true)
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

bl.usernameAvailable = (name = '') => {
  const nameInput = name.toLocaleLowerCase()
  return (
    (allUsernames.size < 1) || !allUsernames.some(username => username === nameInput)
  )
}

bl.emailIdAvailable = (id = '') => {
  const emailIdInput = id.toLocaleLowerCase()
  return (
    (allEmailIds.size < 1) || !allEmailIds.some(emailId => emailId === emailIdInput)
  )
}

// BL for basic CRUD operations

bl.createUser = values => {
  return getAllEmailIds()
  //resolve for available emails
    .then(
      (res) => {
        if (!bl.emailIdAvailable(values.emailId)) {
          return returnObj('That email is already in use.')
        }
        //resolve for available usernames
        return getAllUsers()
          .then(
            res => {
              if (!bl.usernameAvailable(values.username)) {
                return returnObj('Username is already taken')
              }
              // test valid passowrd and email
              if (isValidPwd(`${values.password}`) && isValidEmail(`${values.emailId}`)) {
                return dal.createUser(user({...values}))
                  .then(res => {
                    return getAllEmailIds(true)
                      .then(
                      () => getAllUsers(true)
                        .then(
                          () => {
                            console.log('Updated usernames and passwords')
                            return res
                          }
                        ).catch(
                          () => returnObj('Unable to update correctly.', {}, false)
                        )
                    )
                  })
                  .catch(err => err)
              }

              return Promise.reject().then(
                () => returnObj('Password or email is not valid. Fix these to continue the process.')
              )
            }
          )
          .catch(
            err => {
              console.log(err)
              return returnObj(`Error: ${new Error(err)}`)
            }
          )
      }
    )
    .catch(err => returnObj(`Error: ${new Error(err)}`))
}

bl.getUserAuthentication = (username, password) => {
  /* Make all sorts of authentication checks */

  if (isValidName(username) || isValidEmail(username)) {
    //default query by username
    return Promise.all([dal.getUser(username, 'username'), dal.getUser(username, 'emailId')])
      .then(res => {
        //if we have to catch, something is probably wrong with the server.
        if (typeof (res) === 'undefined') {
          return returnObj('Error 500: Something went wrong with the service.')
        }
        //consider whether both promise methods return either success or fail
        const success = (res || []).some(r => r.success)
        if (!success) return returnObj(`No user identified by ${username} exists.`)

        const authUser = res.find(result => Object.keys(result.data).length > 0).data

        if (authUser.password !== password) {
          return returnObj('User password is incorrect.')
        }
        return returnObj(
          '',
          {username: authUser.username},
          true
        )
      }).catch(
        err => err
      )
  } else { console.log('doesn\'t validate')}

  return Promise
    .resolve(returnObj(
    'Invalid username',
    {},
    false
    ))
    .then(response => response)
    .catch(err => err)
}

export default bl