<template>
  <scroll class="search-suggest"
    :data='songs'
    :pullup='pullup'
    :beforeScroll='beforeScroll'
    @scrollToEnd='searchMore'
    @beforeScroll='blurInput'
  >
    <div class="suggest">
      <div class="best-search" v-if="hasSinger || hasPlaylist">
        <p>最佳匹配</p>
        <div class="search-singer border-bottom" v-if='hasSinger' @click='selectSinger'>
          <img :src="singer.avater" alt="" class="item-img">
          <span class="item-info">歌手：{{singer.name}}</span>
        </div>
        <div class="search-playlist border-bottom" v-if="hasPlaylist" @click='selectPlaylist'>
          <img :src="playlist.bgimage" alt="" class="item-img">
          <div class="item-info">
            <span class="info-text">{{playlist.name}}</span>
            <span class="info-singer">播放量: {{playlist.playCount}}</span>
          </div>
        </div>
      </div>
      <ul class="result-list" v-if="hasSongs">
        <li class="item border-bottom" v-for="(item, index) in songs" :key="index" @click='selectSong(item)'>
          <p class="item-name">{{item.name}}</p>
          <p class="item-info">{{item.singer}}</p>
        </li>
      </ul>
      <loading v-show="hasMore"></loading>
    </div>
    <div class="loading-wrapper" v-show='isLoading'>
      <loading></loading>
    </div>
    <div class="no-search-result" v-show='isNotResult && !isLoading'>
      <p>抱歉找不到匹配</p>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  props: {
    songs: {
      type: Array,
      default: function () {
        return []
      }
    },
    singer: {
      type: Object,
      default: function () {
        return null
      }
    },
    playlist: {
      type: Object,
      default: function () {
        return null
      }
    },
    isLoading: {
      type: Boolean
    },
    hasMore: {
      type: Boolean
    }
  },
  data () {
    return {
      pullup: true,
      beforeScroll: true
    }
  },
  computed: {
    hasSongs () {
      return this.songs.length
    },
    hasSinger () {
      return !!this.singer
    },
    hasPlaylist () {
      return !!this.playlist
    },
    isNotResult () {
      return !(this.hasSongs || this.hasSinger || this.hasPlaylist)
    }
  },
  methods: {
    selectSinger () {
      this.$emit('selectSinger', this.singer)
    },
    selectPlaylist () {
      this.$emit('selectPlaylist', this.playlist)
    },
    selectSong (song) {
      this.$emit('selectSong', song)
    },
    searchMore () {
      this.$emit('searchMore')
    },
    blurInput () {
      this.$emit('inputBlur')
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  .search-suggest
    margin 0 20px
    height 100%
    overflow hidden
    .suggest
      .best-search
        p
          color $color-text-d
          font-size $font-size-medium
          padding 10px 0
        .search-singer
          display flex
          padding 10px 0
          .item-img
            width 50px
            height 50px
          .item-info
            flex 1
            color $color-text-l
            font-size $font-size-medium-x
            padding 0 10px
            line-height 50px
            no-wrap()
        .search-playlist
          display flex
          padding 10px 0
          .item-img
            width 50px
            height 50px
          .item-info
            flex 1
            padding 0 10px
            display flex
            flex-direction column
            justify-content center
            line-height 1.5
            overflow hidden
            .info-text
              color $color-text-l
              font-size $font-size-medium
              no-wrap()
            .info-singer
              color $color-text-d
              font-size $font-size-small
      .result-list
        .item
          display flex
          flex-direction column
          justify-content center
          padding 10px 0
          line-height 1.3
          .item-name
            color $color-text-ll
            font-size $font-size-medium-x
            no-wrap()
          .item-info
            color $color-text-d
            font-size $font-size-small
            no-wrap()
  .no-search-result
    width 100%
    height 100%
    display flex
    justify-content center
    align-items center
    p
      color $color-text-d
      font-size $font-size-medium-x
  .loading-wrapper
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background $color-background
  .border-bottom
    border-bottom 1px solid $color-background-d
</style>
