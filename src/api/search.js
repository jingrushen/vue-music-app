import { HOST } from './host'
import axios from 'axios'

export function getHotKeys () {
  const url = `${HOST}/search/hot`

  return axios.get(url)
}
