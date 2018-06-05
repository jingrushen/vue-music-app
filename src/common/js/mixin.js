import { mapGetters, mapMutations } from 'vuex'
import { shuffle } from 'common/js/util'
import { playMode } from 'common/js/config'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handlePlaylist(this.playList)
  },
  activated () {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playList (list) {
      this.handlePlaylist(list)
    }
  },
  methods: {
    handlePlaylist (playList) {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  computed: {
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong'
    ])
  },
  methods: {
    changeMode () {
      let mode = (this.mode + 1) % 3
      let list = null
      this.setMode(mode)
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setList(list)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrIndex(index)
    },
    ...mapMutations({
      setMode: 'SET_PLAY_MODE',
      setList: 'SET_PLAYLIST'
    })
  }
}
