import {fromJS} from 'immutable'

const browserStorage = {}

browserStorage.get = item => (
  localStorage.getItem(`${item}`)
)

browserStorage.set = (item, data) => {
  localStorage.setItem(`${item}`, data || '')
}

browserStorage.clear = () => {
  localStorage.clear()
}

browserStorage.remove = item => {
  localStorage.removeItem(`${item}`)
}

export default browserStorage