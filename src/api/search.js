import { HOST } from './host'
import axios from 'axios'
import { param } from 'common/js/normalize'

export function getHotKeys () {
  const url = `${HOST}/search/hot`

  return axios.get(url)
}

export function getSongsResult (limit, page, val) {
  let url = `${HOST}/search`

  const data = {
    limit,
    offset: page,
    keywords: val
  }

  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return axios.get(url)
}

export function getPlaylistSingerResult (val) {
  let url = `${HOST}/search/suggest`

  const data = {
    keywords: val
  }

  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return axios.get(url)
}
