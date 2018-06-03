<template>
  <transition name="fade">
    <music-list :hotSongs='this.info.songs' :info='info' v-if="hasInfo"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getPlaylistDisc } from 'api/playlist'
import { mapGetters } from 'vuex'
import { CODE } from 'api/config'
import Disc from 'base/class/Disc'

export default {
  data () {
    return {
      info: ''
    }
  },
  computed: {
    hasInfo () {
      return this.info
    },
    ...mapGetters([
      'disc'
    ])
  },
  created () {
    this._getPlaylistDisc(this.disc.id)
  },
  methods: {
    _getPlaylistDisc (id) {
      if (!id) {
        this.$router.push({
          path: '/recommend'
        })
      }
      getPlaylistDisc(id).then((res) => {
        if (res.data.code === CODE) {
          const data = res.data.playlist
          this.info = new Disc(data)
        }
      })
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .fade-enter-active, .fade-leave-active
    transition transform .3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
</style>
