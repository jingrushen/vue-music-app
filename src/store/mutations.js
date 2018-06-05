import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, item) {
    state.singer = item
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURR_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC] (state, item) {
    state.disc = item
  },
  [types.SET_SAVE_HISTOEY] (state, data) {
    state.saveHistory = data
  }
}

export default mutations
