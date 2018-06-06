import * as types from './mutation-types'
import { shuffle } from 'common/js/util'
import { playMode } from 'common/js/config'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

const actions = {
  selectPlay ({commit, state}, {list, index}) {
    if (state.mode === playMode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAYLIST, randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_CURR_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  selectRandom ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURR_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  saveSearchHistory ({commit}, query) {
    commit(types.SET_SAVE_HISTOEY, saveSearch(query))
  },
  deleteSearchHistory ({commit}, index) {
    commit(types.SET_SAVE_HISTOEY, deleteSearch(index))
  },
  clearSearchHistory ({commit}) {
    commit(types.SET_SAVE_HISTOEY, clearSearch())
  },
  deleteAllPlaylist ({commit}) {
    commit(types.SET_PLAYING_STATE, false)
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURR_INDEX, -1)
  },
  insertSong ({commit, state}, song) {
    // 先判断playlist中有没有song，有的话先插入到当前的currentIndex后面然后删除原来的song，没有的话就直接添加
    let currIndex = state.currentIndex
    let playlist = state.playList.slice()
    let sequencelist = state.sequenceList.slice()

    let currentSong = playlist[currIndex]

    currIndex++

    let index = findIndex(playlist, song)
    playlist.splice(currIndex, 0, song)
    if (index > -1) {
      if (index > currIndex) {
        playlist.splice(++index, 1)
      } else {
        playlist.splice(index, 1)
        currIndex--
      }
    }

    let currSindex = (currentSong ? findIndex(sequencelist, currentSong) : -1)
    let Sindex = findIndex(sequencelist, song)
    currSindex++
    sequencelist.splice(currSindex, 0, song)
    if (Sindex > -1) {
      if (Sindex > currSindex) {
        sequencelist.splice(++Sindex, 1)
      } else {
        sequencelist.splice(Sindex, 1)
      }
    }

    commit(types.SET_CURR_INDEX, currIndex)
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequencelist)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  deleteSong ({commit, state}, song) {
    let currIndex = state.currentIndex
    let playlist = state.playList.slice()
    let sequencelist = state.sequenceList.slice()

    let index = findIndex(playlist, song)
    playlist.splice(index, 1)
    if (index < currIndex || currIndex === playlist.length) {
      currIndex--
    }

    let Sindex = findIndex(sequencelist, song)
    sequencelist.splice(Sindex, 1)

    commit(types.SET_CURR_INDEX, currIndex)
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequencelist)

    if (!playlist.length) {
      commit(types.SET_PLAYING_STATE, false)
    }
  },
  addPlaylistSong ({commit, state}, song) {
    let currIndex = state.currentIndex
    let playlist = state.playList.slice()
    let sequencelist = state.sequenceList.slice()

    let currsong = playlist[currIndex]

    let index = findIndex(playlist, song)

    playlist.splice(currIndex + 1, 0, song)

    let currSindex = (currsong ? findIndex(sequencelist, currsong) : -1)
    let Sindex = findIndex(sequencelist, song)

    sequencelist.splice(currSindex + 1, 0, song)
    if (currIndex === -1) {
      currIndex++
      commit(types.SET_PLAYING_STATE, true)
      commit(types.SET_FULL_SCREEN, true)
    } else {
      if (index > -1) {
        if (index > currIndex) {
          playlist.splice(++index, 1)
        } else {
          playlist.splice(index, 1)
          currIndex--
        }
      }

      if (Sindex > -1) {
        if (Sindex > currSindex) {
          sequencelist.splice(++Sindex, 1)
        } else {
          sequencelist.splice(Sindex, 1)
        }
      }
    }
    commit(types.SET_CURR_INDEX, currIndex)
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequencelist)
  }
}

export default actions
