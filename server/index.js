import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import {user} from './routes'

const PORT = process.env.BACKEND_PORT
const DOMAIN = process.env.BACKEND_DOMAIN

const app = express()

app.use(helmet()) //protection against xss attacks and other vulnerabilities
app.use(cors())
app.use(bodyParser.json({limit: '50mb', urlencoded: true}))
app.use(bodyParser.urlencoded({limit: '50mb', urlencoded: true}))

user(app)

app.listen(PORT, () => {
  console.log(`${DOMAIN} is running on port ${PORT}`)
})
