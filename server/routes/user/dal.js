import dbDriver from '../../js/dbdriver'
import user from '../../js/obj/user'

const dal = {}

dal.createUser = values => (
  dbDriver()
    .then(
      db => (
        db.collection('user').insertOne({...values})
          .then(res => {
            console.log(res.result)
            if (res.result.n === 1) {
              return {message: res.ops.username, success: true}
            }
            return {message: 'Account was unable to be updated.', success: false}
          })
          .catch(err => {
            console.log(err)
            return ({message: 'Unable to created account.', success: false})
          })
    ))
    .catch(err => new Error(err))
)

dal.getUser = user => {
  return dbDriver()
    .then(
      db => (
        db.collection('user').find(user._id)
      ))
    .catch()
}

dal.getAllAccountNames = () => {
  return dbDriver()
    .then(
      db => db.collection('user').find({}).toArray().then(
        results => (results || []).map(res => res.username)
      )
    )
    .catch(
      err => `Unable to retrieve all account names; Error: ${err}`
    )
}

dal.getAllEmailIds = () => {
  return dbDriver()
    .then(
      db => db.collection('user').find({}).toArray().then(
        results => (results || []).map(res => res.emailId)
      )
    )
    .catch(
      err => `Unable to retrieve all email ids; Error: ${err}`
    )
}

export default dal