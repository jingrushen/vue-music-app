<template>
  <div class="recommend" ref="wrapper">
    <div>
      <div class="recommend-content">
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
          <ul>
            <li class="list-item" v-for="item in discList" :key="item.dissid">
              <div class="item-icon">
                <img class='item-img' :src="item.imgurl">
              </div>
              <div class="item-text">
                <h2 class="text-title">{{item.creator.name}}</h2>
                <p class="text-desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      recommendList: [],
      discList: [],
      scroll,
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
  watch: {
    discList () {
      this.scroll.refresh()
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper)
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
        if (res.code === ERR_OK) {
          const data = res.data
          this.discList = data.list
        }
      })
    }
  },
  components: {
    Slider,
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
    overflow hidden
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
        .list-item
          display flex
          padding 0 20px 20px
          .item-icon
            margin-right 20px
            .item-img
              width 60px
              height 60px
          .item-text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            font-size $font-size-medium
            .text-title
              color $color-text
              margin-bottom 10px
            .text-desc
              color $color-text-ll
</style>
