<template>
  <div class="player" v-show='hasPlayList'>
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.img">
        </div>
        <div class="top">
          <div class="back" @click='close'>
            <i class="icon-back"></i>
          </div>
          <h1 class="top-title">{{currentSong.name}}</h1>
          <h2 class="top-subtitle">{{currentSong.singer}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="hasCdRotate">
                <img :src="currentSong.img" alt="" class="image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <span class="time time-l">{{format(currentTime)}}</span>
          <div class="progress-wrapper"></div>
          <span class="time time-r">{{format(currentSong.interval / 1000)}}</span>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev" @click='prev'></i>
            </div>
            <div class="icon i-center">
              <i :class="normalIcon" @click='toggleState'></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next" @click='next'></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click='open'>
        <div class="img-icon">
          <div class="img-wrapper">
            <img width='40' height='40' :src="currentSong.img" alt="">
          </div>
        </div>
        <div class="song-text">
          <h2 class="song-name">{{currentSong.name}}</h2>
          <p class="song-desc">{{currentSong.singer}}</p>
        </div>
        <div class="control">
          <i class="icon-mini" :class="miniIcon" @click.stop='toggleState'></i>
        </div>
        <div class="control">
          <i class="icon-mini icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio"
      @canplay='ready'
      @error='error'
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getSongUrl } from 'api/song'
import { CODE } from 'api/config'

export default {
  data () {
    return {
      songReady: false,
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters([
      'playList',
      'fullScreen',
      'currentSong',
      'playing',
      'currentIndex'
    ]),
    hasPlayList () {
      return !!this.playList.length
    },
    normalIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    hasCdRotate () {
      return this.playing ? 'play' : 'play pause'
    }
  },
  watch: {
    currentSong (song) {
      if (!song && song.url) {
        return
      }
      this._getSongUrl(song.id)
    },
    playing (state) {
      const audio = this.$refs.audio
      state ? audio.play() : audio.pause()
    }
  },
  methods: {
    close () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    prev () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index < 0) {
        index = this.playList.length - 1
      }
      this.setCurrIndex(index)
      if (!this.playing) {
        this.toggleState()
      }
      this.songReady = false
    },
    next () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index >= this.playList.length) {
        index = 0
      }
      this.setCurrIndex(index)
      if (!this.playing) {
        this.toggleState()
      }
      this.songReady = false
    },
    _getSongUrl (id) {
      getSongUrl(id).then((res) => {
        if (res.data.code === CODE) {
          let url = res.data.data[0].url
          this.currentSong.url = url
          this.audioPlay()
        }
      })
    },
    audioPlay () {
      this.$refs.audio.src = this.currentSong.url
      this.$refs.audio.play()
    },
    toggleState () {
      this.setPlayState(!this.playing)
    },
    ready () {
      this.songReady = true
    },
    error () {

    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    format (time) {
      let interval = time | 0
      const m = interval / 60 | 0
      const s = interval % 60
      return `${m}:${this._pad(s)}`
    },
    _pad (num) {
      if (num < 10) {
        num = '0' + num
      }
      return num
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayState: 'SET_PLAYING_STATE',
      setCurrIndex: 'SET_CURR_INDEX'
    })
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  .player
    .normal-player
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      background $color-background
      z-index 150
      .background
        position absolute
        left 0
        top 0
        opacity .6
        width 100%
        height 100%
        filter blur(20px)
        z-index -1
      .top
        position relative
        margin-bottom 25px
        .back
          position absolute
          left 6px
          top 0
          padding 9px
          transform rotate(-90deg)
          .icon-back
            font-size $font-size-large-x
            color $color-theme
        .top-title
          width 70%
          line-height 40px
          text-align center
          font-size $font-size-large
          color $color-text
          margin 0 auto
          no-wrap()
        .top-subtitle
          text-align center
          line-height 20px
          font-size $font-size-medium
          color $color-text
          padding 0 10px
          no-wrap()
      .middle
        .middle-l
          width 100%
          padding-bottom 80%
          height 0
          position relative
          .cd-wrapper
            width 80%
            position absolute
            left 10%
            top 0
            .cd
              &.play
                animation rotate 50s linear infinite
              &.pause
                animation-play-state paused
              .image
                width 100%
                height 100%
                box-sizing border-box
                border-radius 50%
                border 10px solid hsla(0,0%,100%,.1)
      .bottom
        width 100%
        bottom 50px
        position absolute
        .operators
          display flex
          align-items center
          .icon
            flex 1
            color $color-theme
            i
              font-size 30px
          .i-left
            text-align right
          .i-center
            text-align center
            padding 0 20px
            i
             font-size 40px
          .i-right
            text-align left
      &.normal-enter-active, &.normal-leave-active
        transition all .4s
        .top
          transition all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        .bottom
          transition all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity 0
        .top
          transform translate3d(0, -100px, 0)
        .bottom
          transform translate3d(0, 100px, 0)
    .mini-player
      position fixed
      left 0
      bottom 0
      width 100%
      height 60px
      background $color-highlight-background
      z-index 200
      display flex
      align-items center
      z-index 250
      &.mini-enter-active, &.mini-leave-active
        transition all .4s
      &.mini-enter, &.mini-leave-to
        opacity 0
      .img-icon
        width 40px
        height 40px
        padding 0 10px 0 20px
        .img-wrapper
          width 100%
          height 100%
          img
            border-radius 50%
      .song-text
        flex 1
        display flex
        flex-direction column
        justify-content center
        line-height 20px
        no-wrap()
        .song-name
          font-size $font-size-medium
          color $color-text
        .song-desc
          font-size $font-size-small
          color $color-text-d
      .control
        width 30px
        padding 0 10px
        .icon-mini
          font-size 32px
          color $color-theme-d
  @keyframes rotate {
    0% {
      transform rotate(0)
    }
    100% {
      transform rotate(360deg)
    }
  }
</style>
