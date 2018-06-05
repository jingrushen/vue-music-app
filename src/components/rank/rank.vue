<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data='rankList' ref="scroll" @scrollToStart='updateData' :pullDown='pullDown'>
      <div>
        <div class="loading-container" ref="loading">
          <loading></loading>
        </div>
        <ul>
          <li class="list-item" v-for="item in rankList" :key='item.id'  @click='selectItem(item)'>
            <div class="item-img">
              <img v-lazy="item.bgimage">
            </div>
            <ul class="item-rank">
              <li class="item-rank-list" v-for="(song, index) in item.songs" :key="index" v-if="index < 3">
                <span>{{index + 1}}.</span>
                <span>{{song.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRankList } from 'api/rank'
import { CODE } from 'api/config'
import Disc from 'base/class/Disc'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { mapMutations } from 'vuex'
import { playlistMixin } from 'common/js/mixin'

const LIST_NUM = 8
const MAX_LIST = 23

export default {
  mixins: [playlistMixin],
  data () {
    return {
      rankList: [],
      pullDown: true,
      i: 0
    }
  },
  created () {
    this._getRankList()
  },
  methods: {
    _getRankList (callback) {
      while (this.i !== LIST_NUM) {
        getRankList(this.i).then((res) => {
          if (res.data.code === CODE) {
            const data = res.data.playlist
            this.rankList.push(new Disc(data))
          }
          callback && callback()
        })
        this.i = (this.i + 1 > MAX_LIST ? 0 : ++this.i)
      }
    },
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setDisc(item)
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    updateData () {
      // this.rankList = []
      this.$refs.loading.style.transform = `translateY(0px)`
      this.$refs.loading.style.height = '45px'
      // this._getRankList(() => {
      //   if (this.rankList.length === LIST_NUM) {
      //     this.$refs.loading.style.height = ''
      //     this.$refs.loading.style.transform = ''
      //   }
      // })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
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
  .rank
    position fixed
    width 100%
    top 88px
    bottom 0
    .toplist
      width 100%
      height 100%
      overflow hidden
      .loading-container
        width 100%
        transform translateY(-45px)
        height 0
      .list-item
        width 90%
        margin 0 auto
        padding-top 20px
        display flex
        justify-content  space-between
        .item-img
          width 100px
          height 100px
          img
            width 100%
            height 100%
        .item-rank
          flex 1
          display flex
          flex-direction column
          justify-content center
          color $color-text-d
          font-size $font-size-small
          padding 0 20px
          background $color-highlight-background
          overflow hidden
          .item-rank-list
            no-wrap()
            line-height 30px
</style>
