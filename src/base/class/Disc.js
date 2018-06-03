import { createSong } from './Song'

// const showSongNUM = 3

export default class Disc {
  constructor ({id, playCount, name, coverImgUrl, tracks}) {
    this.id = id
    this.playCount = playCount
    this.name = name
    this.bgimage = coverImgUrl
    if (tracks) {
      this.songs = this.getSong(tracks)
    }
  }

  getSong (tracks) {
    let songs = []
    tracks.forEach((item) => {
      songs.push(createSong(item))
    })
    return songs
  }
}
