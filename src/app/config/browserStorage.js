import {fromJS} from 'immutable'

const browserStorage = {}

browserStorage.get = item => (
  localStorage.getItem(`${item}`)
)

browserStorage.set = (item, data) => {
  localStorage.setItem(`${item}`, data || '')
}

export default browserStorage