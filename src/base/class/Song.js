
export default class Song {
  constructor ({id, name, singer, desc, img, interval}) {
    this.id = id
    this.name = name
    this.singer = singer
    this.desc = desc
    this.img = img
    this.interval = interval
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.id,
    name: musicData.name,
    singer: mergeSinger(musicData.ar),
    desc: musicData.al.name,
    img: musicData.al.picUrl,
    interval: musicData.dt / 1000
  })
}

function mergeSinger (data) {
  if (!data) {
    return
  }
  let ret = []
  ret = data.map((item) => {
    return item.name
  })
  return ret.join('/')
}
