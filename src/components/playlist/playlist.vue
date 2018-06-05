<template>
  <transition name="fade">
    <div class="playlist" @click='hide' v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <span class='icon icon-icon'>
            <i :class="iconMode" @click='changeMode'></i>
          </span>
          <span class="title">{{headerTitle}}</span>
          <span class='icon clear'>
            <i class="icon-clear" @click='clear'></i>
          </span>
        </div>
        <scroll class="list-content" :data='playList' ref="scroll">
          <ul class="list">
            <transition-group name="list">
              <li ref='listItem' class="list-item" v-for="(item,index) in sequenceList" :key="item.id" @click='selectItem(item, index)'>
                <i class="current" :class="getCurrCls(item)"></i>
                <span class="item-name">{{item.name}}</span>
                <span class="icon" @click.stop="deleteItem(item)">
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </ul>
        </scroll>
        <div class="list-operate">
          <div class="addsong">
            <span class="icon"><i class="icon-add"></i></span>
            <span class="text">将歌曲添加至队列</span>
          </div>
        </div>
        <div class="list-close" @click='hide'>
          <span class="text">关闭</span>
        </div>
      </div>
      <comfirm v-show='showCom' @cancel='cancel' @clearAll='comfirm'></comfirm>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Scroll from 'base/scroll/scroll'
import Comfirm from 'base/comfirm/comfirm'
import { playMode } from 'common/js/config'
import { playerMixin } from 'common/js/mixin'

export default {
  mixins: [playerMixin],
  computed: {
    ...mapGetters([
      'playList',
      'sequenceList',
      'currentSong',
      'mode'
    ]),
    headerTitle () {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ? '单曲循环' : '随机播放'
    }
  },
  data () {
    return {
      showFlag: false,
      showCom: false
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      this.scrollToCurrent(newSong)
    }
  },
  methods: {
    hide () {
      this.showFlag = false
    },
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
        this.scrollToCurrent(this.currentSong)
      })
    },
    clear () {
      this.showCom = true
    },
    cancel () {
      this.showCom = false
    },
    comfirm () {
      this.showCom = false
      this.deleteAllPlaylist()
      this.hide()
    },
    getCurrCls (item) {
      return (item.id === this.currentSong.id ? 'icon-play' : '')
    },
    selectItem (item, index) {
      if (this.mode === playMode.random) {
        index = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setCurrIndex(index)
      this.setPlayState(true)
    },
    deleteItem (item) {
      this.deleteSong(item)
      if (!this.playList.length) {
        this.hide()
      }
    },
    scrollToCurrent (current) {
      const index = this.sequenceList.findIndex((item) => {
        return item.id === current.id
      })
      this.$refs.scroll.scrollToElement(this.$refs.listItem[index], 500)
    },
    ...mapMutations({
      setCurrIndex: 'SET_CURR_INDEX',
      setPlayState: 'SET_PLAYING_STATE'
    }),
    ...mapActions([
      'deleteSong',
      'deleteAllPlaylist'
    ])
  },
  components: {
    Scroll,
    Comfirm
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  .playlist
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background $color-background-d
    z-index 300
    &.fade-enter-active, &.fade-leave-active
      transition all .3s
      .list-wrapper
        transition all .3s
    &.fade-enter, &.fade-leave-to
      opacity 0
      .list-wrapper
        transform translate3d(0, 100%, 0)
    .list-wrapper
      width 100%
      background $color-highlight-background
      position absolute
      bottom 0
      left 0
      z-index 999
      .list-header
        padding 20px 30px 10px 20px
        display flex
        align-items center
        .icon-icon
          font-size 30px
          color $color-theme
          margin-right 10px
        .title
          font-size $font-size-medium
          color $color-text-l
          flex 1
        .clear
          color $color-text-d
          font-size $font-size-medium
      .list-content
        max-height 240px
        overflow hidden
        padding 0 30px 0 20px
        .list-item
          display flex
          align-items center
          padding-top 16px
          line-height 1.3
          .current
            flex 0 0 20px
            font-size $font-size-small
            color $color-theme-d
          .item-name
            flex 1
            color $color-text-d
            font-size $font-size-medium
            no-wrap()
          .icon
            color $color-theme
            font-size $font-size-small
            margin-left 15px
      .list-operate
        display flex
        justify-content center
        align-items center
        margin 20px 0
        .addsong
          width 150px
          box-sizing border-box
          border-radius 100px
          border 1px solid $color-text-l
          padding 8px 16px
          display flex
          align-items center
          .icon
            font-size $font-size-small-s
            margin-right 5px
          .text
            color $color-text-l
            font-size $font-size-small
      .list-close
        line-height 50px
        color $color-text-l
        font-size $font-size-large
        text-align center
        background $color-background-d
</style>
