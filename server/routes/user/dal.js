import dbDriver from '../../js/dbdriver'
import {returnObj, user} from '../../js/obj'

const dal = {}

dal.createUser = values => (
  dbDriver()
    .then(
      db => (
        db.collection('user').insertOne({
          ...values,
          created: `${new Date()}`
        })
          .then(res => {
            console.log(res.result)
            if (res.result.n === 1) {
              return returnObj(
                'Account created successfully!',
                {...res.ops},
                true
              )
            }
            return returnObj('Account was unable to be updated.')
          })
      ))
    .catch(err => returnObj(new Error(err)))
)

dal.getUser = (username, field = 'username') => {
  console.log('in the DAL:', username, field)
  return dbDriver()
    .then(
      db => (
        db.collection('user').findOne({[`${field}`]: `${username.toLowerCase()}`})
          .then(res => {
            if (typeof (res) === 'object') {
              return returnObj(
                '',
                user(res),
                true
              )
            } else
              return returnObj(
                '',
                {},
                false
            )
          })
          .catch(err => returnObj(`Unable to get user error: ${err}`, false))
      ))
}

dal.getAllAccountNames = () => {
  console.log('Accessing account information...')
  return dbDriver()
    .then(
      db => db.collection('user').find({}).toArray().then(
        results => {
          console.log('hello?')
          return returnObj(
            '',
            (results || []).map(res => res.username),
            true
          )
        }
      )
    )
    .catch(
      err => returnObj(`Unable to retrieve all account names; Error: ${err}`)
    )
}

dal.getAllEmailIds = () => {
  return dbDriver()
    .then(
      db => db.collection('user').find({}).toArray().then(
        results => {
          return returnObj(
            '',
            (results || []).map(res => res.emailId),
            true
          )
        }
      )
    )
    .catch(
      err => returnObj(`Unable to retrieve all email ids; Error: ${err}`)
    )
}

export default dal