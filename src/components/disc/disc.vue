<template>
  <music-list :hotSongs='songs' :info='info' v-if="hasInfo"></music-list>
  <!-- <div>gedan</div> -->
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getRecommendDisc } from 'api/recommend'
import { mapGetters } from 'vuex'
import { CODE } from 'api/config'
import { Disc } from 'base/class/Disc'

export default {
  data () {
    return {
      songs: [],
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
    this._getRecommendDisc(this.disc.id)
  },
  methods: {
    _getRecommendDisc (id) {
      if (!id) {
        this.$router.push({
          path: '/recommend'
        })
      }
      getRecommendDisc(id).then((res) => {
        if (res.data.code === CODE) {
          const data = res.data.playlist
          this.info = new Disc(data)
          this.songs = this.info.getSong()
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
</style>
