import { createSong } from './Song'

// const showSongNUM = 3

export class Disc {
  constructor ({id, playCount, name, coverImgUrl, tracks}) {
    this.id = id
    this.playCount = playCount
    this.name = name
    this.bgimage = coverImgUrl
    this.tracks = tracks
  }

  getSong () {
    let songs = []
    this.tracks.forEach((item, index) => {
      songs.push(createSong(item))
    })
    return songs
  }
}
