import axios from 'axios'
import { HOST } from './host'

export function getPlaylistDisc (id) {
  let url = `${HOST}/playlist/detail?id=${id}`

  return axios.get(url)
}
