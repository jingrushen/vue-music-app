import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, item) {
    state.singer = item
  }
}

export default mutations
