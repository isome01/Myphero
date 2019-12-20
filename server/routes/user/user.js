import bl, {getAllEmailIds, getAllUsers} from './bl'

/* all routes for user details */

const user = app => {
  // create a new user
  app.post('/user', (req, res) => {
    bl.createUser(req.body.user)
      .then(result => {
        res.json({
          "message": `${result.message}`,
          "username": req.body.user.username,
          "success": result.success
        })
      })
      .catch(
        () => {
          res.json({"message": "Unable to process request.", "success": false})
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
            res.json({"valid": valid})
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
            res.json({"valid": valid})
          }
        )
    }
  })
}

export default user