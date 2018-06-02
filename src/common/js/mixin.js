import { mapGetters } from 'vuex'

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
