import { param } from 'common/js/normalize'
import { HOST } from './host'
import axios from 'axios'

export function getSongUrl (id) {
  let url = `${HOST}/music/url`

  const data = {
    id
  }

  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.get(url)
}

export function getSongLyric (id) {
  let url = `${HOST}/lyric?id=${id}`

  return axios.get(url)
}
