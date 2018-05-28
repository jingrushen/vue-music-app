// import jsonp from 'common/js/jsonp'
// import { commonParams, options } from './config'
// import { HOST } from './host'
// import axios from 'axios'

// export function getSingerList () {
//   const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
//   const data = Object.assign({}, commonParams, {
//     channel: 'singer',
//     page: 'list',
//     key: 'all_all_all',
//     pagesize: 100,
//     pagenum: 1,
//     hostUin: 0,
//     needNewCode: 0,
//     platform: 'yqq'
//   })
//   // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
//   // const data = Object.assign({}, commonParams, {
//   //   loginUin: 0,
//   //   hostUin: 0,
//   //   playform: 'yqq',
//   //   needNewCode: 0,
//   //   data: {
//   //     comm: {
//   //       ct: 24,
//   //       cv: 10000
//   //     },
//   //     singerList: {
//   //       module: 'Music.SingerListServer',
//   //       method: 'get_singer_list',
//   //       param: {
//   //         area: -100,
//   //         genre: -100,
//   //         index: -100,
//   //         sin: 0,
//   //         cur_page: 1
//   //       }
//   //     }
//   //   }
//   // })
//   return jsonp(url, data, options)
// }

// export function getSingerDetail (id) {
//   const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
//   const data = Object.assign({}, commonParams, {
//     loginUin: 0,
//     hostUin: 0,
//     platform: 'yqq',
//     needNewCode: 0,
//     singermid: id,
//     order: 'listen',
//     begin: 0,
//     num: 30,
//     songstatus: 1
//   })

//   return jsonp(url, data, options)
// }

// export function getSongUrl (id) {
//   const url = `${HOST}/music/url?id=${id}`

//   return axios.get(url)
// }

// export function getHotSinger () {
//   const url = `${HOST}/top/artists?offset=0&limit=30`

//   return axios.get(url)
// }
import { param } from 'common/js/normalize'
import { HOST } from './host'
import axios from 'axios'

export function getSingerList () {
  let url = `${HOST}/top/artists`

  const data = {
    limit: 100
  }
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return axios.get(url)
}

export function getSingerDetail (id) {
  let url = `${HOST}/artists?id=${id}`

  return axios.get(url)
}
