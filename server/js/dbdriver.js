import {MongoClient} from 'mongodb'
const PROTOCOL = process.env.DB_DOMAIN
const DOMAIN = 'ec2-3-14-153-6.us-east-2.compute.amazonaws.com'
const PORT = process.env.DB_PORT
const DB = process.env.DB_NAME
const user = process.env.DB_USER
const pwd = process.env.DB_PWD
const urlParser = {useNewUrlParser: true}
const useUnifiedTopology = {useUnifiedTopology: true}

const url = `${PROTOCOL}://${user}:${pwd}@${DOMAIN}:${PORT}/${DB}`

const dbDriver = (() => {
  return (
  MongoClient.connect(url, urlParser, useUnifiedTopology)
    .then(client => client.db(DB))
    .catch(err => `There's been an error: ${err}`)
)})

export default dbDriver