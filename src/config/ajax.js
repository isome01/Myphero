import axios from 'axios/index'

const protocol = process.env.PROTOCOL || 'http'
const domain = process.env.BACKEND_DOMAIN || 'localhost'
const port = process.env.BACKEND_PORT || 5001

const ajax = axios.create({
  baseURL: `${protocol}://${domain}:${port}`,
  timeout: 8000,
  headers: {'Accept':'*/*', 'Content-Type':'application/json'}
})

export default ajax