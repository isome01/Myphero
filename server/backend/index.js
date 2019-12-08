/* server config */
const PORT = process.env.BACKEND_PORT || 5001
const DOMAIN = process.env.BACKEND_DOMAIN

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

/* routes */



app.use(cors())
app.use(bodyParser.json({urlencoded: true}))

app.listen(PORT, () => {
  console.log(`${DOMAIN} service listening on port ${PORT}.`)
})