import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
import { HOST } from './host'
import { param } from 'common/js/normalize'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList () {
  let url = `${HOST}/personalized`

  const data = {}

  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return axios.get(url)
}

export function getRecommendDisc (id) {
  let url = `${HOST}/playlist/detail?id=${id}`

  return axios.get(url)
}
