import axios from 'axios'
import browserStorage from './browserStorage'

const ajax = axios.create({
  baseURL: browserStorage.get('siteURL'),
  timeout: 1000,
  headers: {'Accept':'*/*', 'Content-Type':'application/json'}
})

export default ajax