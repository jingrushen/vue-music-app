<template>
  <transition name='fade'>
    <music-list :singer='singer' :hot-songs='hotSongs'></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

import { getSingerDetail } from 'api/singer'
import { CODE } from 'api/config'

import { createSong } from 'base/class/Song'

import MusicList from 'components/music-list/music-list'

export default {
  data () {
    return {
      hotSongs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getSingerDetail(this.singer.id)
  },
  methods: {
    _getSingerDetail (id) {
      if (!id) {
        this.$router.push({
          path: '/singer'
        })
      }
      getSingerDetail(id).then((res) => {
        if (res.data.code === CODE) {
          let hotSongs = res.data.hotSongs
          hotSongs.forEach((song) => {
            this.hotSongs.push(createSong(song))
          })
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
