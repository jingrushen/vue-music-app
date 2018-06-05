<template>
  <div class="music-list">
    <div class="back" @click='goBack'>
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{this.info.name}}</h1>
    <loading v-show="!hasImage" :height='imgH'></loading>
    <div class="bg-image" :style='bgStyle' ref="bgImg"
      :class='scrollMax ? "bg-image-after" : "bg-image-before"'
    >
      <div class="filter" ref="filter"></div>
      <div class="play-wrapper" ref="play">
        <div class="play" @click='randomPlay'>
          <i class="icon-play"></i>
          <span class="play-text">随机播放全部</span>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="bglayer"></div>
    <scroll class="list" ref="scroll"
      :listen-scroll='listenScroll'
      :probe-type='probeType'
      :data='hotSongs'
      @scroll='scroll'
      v-show="hasHotSongs"
    >
      <div class="scroll-wrapper" v-show="hasHotSongs">
        <song-list :hot-songs='hotSongs' @select='selectSong'></song-list>
      </div>
      <div class="loading-container" v-show='!hasHotSongs'>
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/songlist'
import Scroll from 'base/scroll/scroll'
import { mapActions } from 'vuex'
import { playlistMixin } from 'common/js/mixin'

const TITLE_H = 40

export default {
  mixins: [playlistMixin],
  data () {
    return {
      bgStyle: '',
      imgH: 0,
      hasImage: false,
      listenScroll: true,
      probeType: 3,
      scrollMax: false
    }
  },
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    },
    hotSongs: {
      type: Array
    }
  },
  computed: {
    hasHotSongs () {
      return this.hotSongs.length
    }
  },
  created () {
    this.loadImage(this.info.bgimage)
  },
  mounted () {
    this.hasImage = false
    this.imgH = this.$refs.bgImg.offsetHeight
    this.$refs.scroll.$el.style.top = this.imgH + 'px'
    this.maxScroll = -(this.imgH - TITLE_H)
  },
  methods: {
    loadImage (url) {
      let img = new Image()
      img.src = url
      let _t = this
      img.onload = function () {
        _t.hasImage = true
        _t.bgStyle = `background-image: url(${url})`
      }
    },
    goBack () {
      this.$router.back()
    },
    scroll (pos) {
      let top = Math.max(this.maxScroll, pos.y)
      let percent = Math.abs(pos.y / this.imgH)
      if (pos.y > 0) {
        let scale = percent + 1
        this.$refs.bgImg.style['transform'] = `scale(${scale})`
        this.$refs.bgImg.style['z-index'] = 10
      } else {
        let blur = Math.min(20 * percent, 20)
        this.$refs.filter.style['backdrop-filter'] = `blur(${blur})px`
        this.$refs.filter.style['webkitBackdrop-filter'] = `blur(${blur})px`
        this.$refs.bgImg.style['z-index'] = 0
      }
      if (top === this.maxScroll) {
        this.scrollMax = true
        this.$refs.bgImg.style['z-index'] = 20
        this.$refs.play.style.display = 'none'
      } else {
        this.$refs.play.style.display = ''
        this.scrollMax = false
      }
      this.$refs.bglayer.style['transform'] = `translate3d(0, ${top}px, 0)`
    },
    selectSong (song, index) {
      this.selectPlay({
        list: this.hotSongs,
        index
      })
    },
    randomPlay () {
      this.selectRandom({
        list: this.hotSongs
      })
    },
    handlePlaylist (playlist) {
      let bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    ...mapActions([
      'selectPlay',
      'selectRandom'
    ])
  },
  components: {
    Loading,
    SongList,
    Scroll
  }
}
</script>

<style lang='stylus' scoped>
@import "~common/stylus/mixin"
@import '~common/stylus/variable'
  .music-list
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
    z-index 2
    .back
      position absolute
      width 40px
      top 0
      left 6px
      text-align center
      line-height 45px
      z-index 99
      .icon-back
        font-size $font-size-large-x
        color $color-theme
    .title
      position absolute
      top 0
      left 0
      right 0
      line-height 40px
      text-align center
      font-size $font-size-large
      color $color-text
      z-index 30
      no-wrap()
    .bg-image
      position relative
      width 100%
      background-size cover
      transform-origin top
      .filter
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        background $color-background-cover
      .play-wrapper
        position absolute
        bottom 20px
        z-index 50
        width 100%
        .play
          width 135px
          margin 0 auto
          text-align center
          padding 7px 0
          border 1px solid $color-background
          border-radius 100px
          color $color-background
          box-sizing border-box
          font-size 0
          .icon-play
            display inline-block
            vertical-align middle
            font-size $font-size-medium-x
            margin-right 6px
          .play-text
            display inline-block
            font-size $font-size-small
            vertical-align middle
    .bg-image-before
      height 0
      padding-bottom 70%
      z-index 0
    .bg-image-after
      height 40px
      padding-bottom 0
    .list
      position absolute
      top 0
      bottom 0
      width 100%
      background $color-background
      .loading-container
        position absolute
        top 50%
        width 100%
        transform translateY(-50%)
    .bg-layer
      height 100%
      position relative
      background $color-background
</style>
