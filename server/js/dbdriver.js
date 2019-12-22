import {MongoClient} from 'mongodb'
const PROTOCOL = process.env.DB_PROTOCOL
const DOMAIN = process.env.DB_DOMAIN
const PORT = process.env.DB_PORT
const DB = process.env.DB_NAME
const user = process.env.DB_USER
const pwd = process.env.DB_PWD

const config = {
  urlParser: true,
  useUnifiedTopology: true,
  ssl: false
}

const url = encodeURI(`${PROTOCOL}://${user}:${pwd}@${DOMAIN}:${PORT}/${DB}`)

const dbDriver = () => (
  MongoClient.connect(url, {...config})
    .then(client => client.db(DB))
    .catch(err => `There's been an error: ${err}`)
)

export default dbDriver