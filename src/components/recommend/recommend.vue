<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data='discList' ref="scroll">
      <div>
        <div class="slider" ref="slider">
          <loading v-show="!hasRecommendList" :height='height'></loading>
          <div class="slider-wrapper" v-if="hasRecommendList">
            <slider>
              <div v-for="item in recommendList" :key="item.id">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <loading v-show="!hasDiscList"></loading>
          <ul class="list-wrapper">
            <li class="list-item" v-for="item in discList" :key="item.id" @click='selectItem(item)'>
              <div class="item-icon">
                <img class='item-img' v-lazy="item.picUrl">
              </div>
              <div class="item-text">
                <h2 class="text-title">{{item.name}}</h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK, CODE } from 'api/config'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  mixins: [playlistMixin],
  data () {
    return {
      recommendList: [],
      discList: [],
      firstImgLoad: false,
      height: 0
    }
  },
  computed: {
    hasRecommendList () {
      return this.recommendList.length
    },
    hasDiscList () {
      return this.discList.length
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  mounted () {
    this.height = this.$refs.slider.offsetHeight
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendList = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        res = res.data
        if (res.code === CODE) {
          this.discList = res.result
        }
      })
    },
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
      this.setDisc(item)
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      width 100%
      height 100%
      overflow hidden
      .slider
        width 100%
        padding-bottom 40%
        height 0
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          color $color-theme
          font-size $font-size-medium
        .list-wrapper
          display flex
          flex-wrap wrap
          justify-content space-around
          .list-item
            width 32%
            margin-bottom 5px
            .item-icon
              width 100%
              .item-img
                width 100%
            .item-text
              line-height 1.5
              .text-title
                font-size $font-size-small
                color $color-text
</style>
