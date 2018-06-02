import { HOST } from './host'
import axios from 'axios'

export function getRankList (id) {
  const url = `${HOST}/top/list?idx=${id}`

  return axios.get(url)
}
