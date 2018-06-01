import * as types from './mutation-types'
import { shuffle } from 'common/js/util'
import { playMode } from 'common/js/config'

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
  }
}

export default actions
