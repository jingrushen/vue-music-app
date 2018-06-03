<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @changeQuery='changeQuery' ref="searchbox"></search-box>
    </div>
    <div class="search-hot-wrapper" v-show="!hasQuery">
      <search-hot v-if="hasHotKeys" :keys='hotKeys' @clickHotkey='handleHotKey'></search-hot>
    </div>
    <div class="search-suggest-wrapper" v-if="hasQuery" ref="suggestwrapper">
      <search-suggest
        :songs='songsRet'
        :singer='singerRet'
        :playlist='playlistRet'
        :isLoading='isLoading'
        :hasMore='hasMore'
        @selectSinger='changeSinger'
        @selectPlaylist='changePlaylist'
        @selectSong='changeSong'
        @searchMore='searchMore'
      ></search-suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/searchbox/searchbox'
import SearchHot from 'base/searchhot/searchhot'
import SearchSuggest from 'base/suggest/suggest'
import { getHotKeys, getSongsResult, getPlaylistSingerResult } from 'api/search'
import { CODE } from 'api/config'
import Singer from 'base/class/Singer'
import Disc from 'base/class/Disc'
import { mapMutations, mapActions } from 'vuex'
import { getSongDetail } from 'api/song'
import { createSong } from 'base/class/Song'
import { playlistMixin } from 'common/js/mixin'

const LIMIT = 30

export default {
  mixins: [playlistMixin],
  data () {
    return {
      hotKeys: [],
      query: '',
      songsRet: [],
      singerRet: null,
      playlistRet: null,
      isLoading: true,
      timer: null,
      offset: 0,
      hasMore: true,
      songCount: 0
    }
  },
  computed: {
    hasHotKeys () {
      return !!this.hotKeys.length
    },
    hasQuery () {
      return !!this.query
    }
  },
  created () {
    this._getHotKeys()
  },
  methods: {
    _getHotKeys () {
      getHotKeys().then((res) => {
        if (res.data.code === CODE) {
          const data = res.data.result.hots
          this.hotKeys = data
        }
      })
    },
    changeQuery (val) {
      this.query = val
      clearTimeout(this.timer)
      this.isLoading = true
      if (val) {
        this.timer = setTimeout(() => {
          console.log(val)
          this._getSongsResult(val)
          this._getPlaylistSingerResult(val)
          this.isLoading = true
        }, 500)
      } else {
        this.songsRet = []
        this.singerRet = null
        this.playlistRet = null
      }
    },
    handleHotKey (val) {
      this.$refs.searchbox.setQuery(val)
    },
    _getSongsResult (val) {
      getSongsResult(LIMIT, this.offset, val).then((res) => {
        this.hasMore = true
        this.offset = 0
        this.isLoading = false
        this.songsRet = []
        this.songCount = res.data.result.songCount
        if (res.data.code === CODE && this.songCount) {
          const data = res.data.result.songs
          data.forEach((item) => {
            this.songsRet.push({
              id: item.id,
              name: item.name,
              singer: item.artists.map((er) => {
                return er.name
              }).join('/')
            })
          })
        }
      })
    },
    _getPlaylistSingerResult (val) {
      getPlaylistSingerResult(val).then((res) => {
        this.isLoading = false
        if (res.data.code === CODE) {
          const data = res.data.result
          if (data) {
            if (data.artists) {
              this.singerRet = new Singer(data.artists[0])
            } else {
              this.singerRet = null
            }
            if (data.playlists) {
              this.playlistRet = new Disc(data.playlists[0])
            } else {
              this.playlistRet = null
            }
          }
        }
      })
    },
    searchMore () {
      this.offset += LIMIT
      this._checkMore()
      if (!this.hasMore) {
        return
      }
      getSongsResult(LIMIT, this.offset, this.query).then((res) => {
        if (res.data.code === CODE) {
          const data = res.data.result.songs
          data.forEach((item) => {
            this.songsRet.push({
              id: item.id,
              name: item.name,
              singer: item.artists.map((er) => {
                return er.name
              }).join('/')
            })
          })
        }
      })
    },
    _checkMore () {
      if (this.offset > this.songCount) {
        this.hasMore = false
      }
    },
    changeSinger (singer) {
      this.$router.push({
        path: `/search/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    changePlaylist (playlist) {
      this.$router.push({
        path: `/search/playlist/${playlist.id}`
      })
      this.setDisc(playlist)
    },
    changeSong (song) {
      getSongDetail(song.id).then((res) => {
        if (res.data.code === CODE) {
          let list = []
          const data = res.data.songs
          data.forEach((item) => {
            list.push(createSong(item))
          })
          this.selectSearch({
            list
          })
        }
      })
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      if (this.$refs.suggestwrapper) {
        this.$refs.suggestwrapper.style.bottom = bottom
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER',
      setDisc: 'SET_DISC'
    }),
    ...mapActions([
      'selectSearch'
    ])
  },
  components: {
    SearchBox,
    SearchHot,
    SearchSuggest
  }
}
</script>

<style lang='stylus' scoped>
  .search
    .search-box-wrapper
      margin 20px
    .search-hot-wrapper
      margin 20px
    .search-suggest-wrapper
      position fixed
      width 100%
      top 167px
      bottom 0
</style>
