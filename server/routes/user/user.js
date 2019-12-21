import bl, {getAllEmailIds, getAllUsers} from './bl'
import {returnObj} from '../../js/obj'
/* all routes for user details */

const user = app => {
  // create a new user
  app.post('/user', (req, res) => {
    bl.createUser(req.body.user)
      .then(
        result => {
          res.json(result)
      })
      .catch(
        () => {
          res.json(returnObj('Unable to process request.'))
        }
      )
  })

  //Username typeahead
  app.get('/user/user-valid/:typeahead', (req, res) => {
    if (req.params.typeahead) {
      getAllUsers()
        .then(
          () => {
            const valid = bl.usernameAvailable(req.params.typeahead)
            res.json(returnObj('', {valid}, valid))
          }
        )
        .catch(
          err => {
            res.json(returnObj(`Error: ${new Error(err)}`))
          }
        )
    }
  })

  //Email typeahead
  app.get('/user/email-valid/:typeahead', (req, res) => {
    if (req.params.typeahead) {
      getAllEmailIds()
        .then(
          () => {
            const valid = bl.emailIdAvailable(req.params.typeahead)
            res.json(returnObj('', {valid}, valid))
          }
        ).catch(
        err => {
          res.json(returnObj(`Error: ${new Error(err)}`))
        }
      )
    }
  })

  //Login to new user
  app.get('/user/login/authenticate', (req, res) => {
    if (req.query.username && req.query.password) {
      bl.getUserAuthentication(req.query.username, req.query.password)
        .then(result => { res.json(result) })
        .catch(err => { res.json(err) })
    } else {
      res.json({})
    }
  })
}

export default user