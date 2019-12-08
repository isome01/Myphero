import {fromJS} from 'immutable'
import browserStorage from './browserStorage'
import ajax from './ajax'

export const request = ajax

const appEssentials = fromJS({
  siteUrl: `${process.env.PROTOCOL}//${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}`,
  backendUrl: `${process.env.PROTOCOL}//${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}`,
  storage: browserStorage
})

export default appEssentials
