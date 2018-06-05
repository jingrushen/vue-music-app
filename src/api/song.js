import { param } from 'common/js/normalize'
import { HOST } from './host'
import axios from 'axios'

export function getSongDetail (id) {
  const url = `${HOST}/song/detail?ids=${id}`

  return axios.get(url)
}

export function getSongUrl (id) {
  let url = `${HOST}/music/url`

  const data = {
    id
  }

  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.get(url)
}

export function getSongUrl2 (id) {
  let url = 'https://api.imjad.cn/cloudmusic'
  const data = {
    type: 'song',
    id,
    br: 128000
  }
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.get(url)
}

export function getSongLyric (id) {
  let url = `${HOST}/lyric?id=${id}`

  return axios.get(url)
}
