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
        <div class="middle needsclick">
          <transition name="bgshow" mode="out-in">
            <div class="middle-l" v-if="hasCd" @click='changeBg' key="left">
              <div class="cd-wrapper">
                <div class="cd" :class="hasCdRotate">
                  <img :src="currentSong.img" alt="" class="image">
                </div>
              </div>
            </div>
            <scroll class="middle-r" v-else
              key="right"
              :data='currentLyric'
              ref="lyricScroll"
              :click='click'
              @clickBg='changeBg'
            >
              <div class="lyric-wrapper" ref="lyricWrapper">
                <div v-if="hasLyirc">
                  <p class="lyric-text"
                    v-for="(item, index) in currentLyric"
                    :key="index"
                    :class='{"current":index === currLyric}'
                    ref="lyricLines"
                    @touchstart='scrollTouchStart'
                    @touchmove='scrollTouchMove'
                    @touchend='scrollTouchEnd'
                  >{{item.txt}}</p>
                </div>
              </div>
            </scroll>
          </transition>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent='percent' @setPercent='setPercent'></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.interval)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i :class="iconMode" class="icon" @click='changeMode'></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev" @click='prev'></i>
            </div>
            <div class="icon i-center">
              <i :class="normalIcon" @click='toggleState' @touchstart.once='firstplay'></i>
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
          <progress-circle class='progress-circle' :radius='radius' :percent='percent'>
            <i class="icon-mini icon-operate" :class="miniIcon" @click.stop='toggleState'></i>
          </progress-circle>
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
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getSongUrl, getSongLyric } from 'api/song'
import { CODE } from 'api/config'
import { playMode } from 'common/js/config'
import { shuffle, lyricParse } from 'common/js/util'
import ProgressBar from 'base/progressbar/progressbar'
import ProgressCircle from 'base/progresscircle/progresscircle'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: [],
      currLyric: -1,
      hasCd: true,
      click: true,
      isMove: false,
      timer: null,
      isFirstPlayed: false,
      isStartLyric: false
    }
  },
  computed: {
    ...mapGetters([
      'playList',
      'fullScreen',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
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
    },
    percent () {
      return this.currentTime / (this.currentSong.interval)
    },
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    hasLyirc () {
      return !!this.currentLyric.length
    }
  },
  watch: {
    currentSong (newsong, oldsong) {
      if (!newsong && newsong.url) {
        return
      }
      if (newsong.id === oldsong.id) {
        return
      }
      this._getSongUrl(newsong.id)
      this._getSongLyric(newsong.id)
      this.reset()
    },
    playing (state) {
      const audio = this.$refs.audio
      state ? audio.play() : audio.pause()
    }
  },
  methods: {
    reset () {
      this.isStartLyric = false
      this.currentTime = 0
      if (this.$refs.lyricScroll) {
        this.$refs.lyricScroll.scrollTo(0, 0)
      }
    },
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
          console.log(url)
          if (url === null) {
            this.next()
          } else {
            this.currentSong.url = url
            this.audioPlay()
          }
        }
      })
    },
    _getSongLyric (id) {
      getSongLyric(id).then((res) => {
        if (res.data.nolyric) {
          this.currentSong.lrc = [ {txt: '没有歌词匹配'} ]
          this.currentLyric = [ {txt: '没有歌词匹配'} ]
        } else if (res.data.code === CODE) {
          let lrc = res.data.lrc.lyric
          this.currentSong.lrc = lrc
          this.currentLyric = lyricParse(lrc)
          this.currentLyric.push({
            time: this.currentSong.interval * 1000,
            txt: null
          })
        }
      })
    },
    audioPlay () {
      this.$refs.audio.src = this.currentSong.url
      if (this.playing) {
        this.$refs.audio.play()
      }
    },
    toggleState () {
      if (!this.isFirstPlayed) {
        this.isFirstPlayed = true
        return
      }
      this.setPlayState(!this.playing)
    },
    ready () {
      this.songReady = true
    },
    error () {

    },
    updateTime (e) {
      let time = e.target.currentTime
      this.currentTime = time
      this.getCurrentLyric(time)
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
    setPercent (p) {
      const currentTime = (this.currentSong.interval) * p
      this.currentTime = this.$refs.audio.currentTime = currentTime
    },
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
    end () {
      if (this.mode === playMode.loop) {
        this.reset()
        this.$refs.audio.play()
      } else {
        this.next()
      }
    },
    getCurrentLyric (time) {
      let t = time * 1000
      let len = this.currentLyric.length
      for (let i = 0; i < len - 1; i++) {
        if (this.currentLyric[i].time < t && t < this.currentLyric[i + 1].time) {
          this.currLyric = i
          if (this.$refs.lyricLines) {
            if (!this.isStartLyric) {
              this.$refs.lyricScroll.scrollTo(0, 0)
              this.isStartLyric = true
              return
            }
            let el = this.$refs.lyricLines[i]
            if (el && !this.isMove) {
              this.$refs.lyricScroll.scrollToElement(el, 500)
              return
            }
          }
        }
      }
    },
    changeBg () {
      this.hasCd = !this.hasCd
    },
    scrollTouchStart (e) {
      this.isMove = true
    },
    scrollTouchMove (e) {
      clearTimeout(this.timer)
      this.isMove = true
    },
    scrollTouchEnd (e) {
      this.timer = setTimeout(() => {
        this.isMove = false
      }, 2000)
    },
    firstplay () {
      this.setPlayState(true)
      this.$refs.audio.play()
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayState: 'SET_PLAYING_STATE',
      setCurrIndex: 'SET_CURR_INDEX',
      setMode: 'SET_PLAY_MODE',
      setList: 'SET_PLAYLIST'
    })
  },
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll
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
        position absolute
        width 100%
        top 80px
        bottom 170px
        overflow hidden
        .middle-l
          position absolute
          width 100%
          padding-bottom 80%
          height 0
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
        .middle-r
          position absolute
          left 0
          top 50%
          right 0
          bottom 0
          .lyric-wrapper
            width 80%
            text-align center
            margin 0 auto
            overflow hidden
            .lyric-text
              line-height 32px
              color $color-text-l
              font-size $font-size-medium
              transition all .3s
              &.current
                transform scale(1.3)
                color $color-theme
      .bottom
        width 100%
        bottom 50px
        position absolute
        .progress-wrapper
          display flex
          justify-content space-between
          width 80%
          margin 0 auto
          padding 10px 0
          .time
            color $color-text
            flex 0 0 30px
            font-size $font-size-small
            line-height 30px
            &.time-l
              text-align left
            &.time-r
              text-align right
          .progress-bar-wrapper
            flex 1
            height 30px
            display flex
            align-items center
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
          &.icon-operate
            position absolute
            left 0
            top 0
.bgshow-enter-active, &.bgshow-leave-active
  transition all .3s
.bgshow-enter, .bgshow-leave-to
  opacity 0

  @keyframes rotate {
    0% {
      transform rotate(0)
    }
    100% {
      transform rotate(360deg)
    }
  }
</style>
