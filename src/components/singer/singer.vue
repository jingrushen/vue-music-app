<template>
  <div class="singer">
    <div ref="wrapper" class="wrapper">
      <div>
        <ul v-if="hasSingerList">
          <li class="list-group" v-for="(list, index) in singerList" :key="index">
            <h2 class="list-group-title">{{list.title}}</h2>
            <ul>
              <li class="list-group-item" v-for="item of list.item" :key="item.id">
                <img class='item-img' :src="item.avater">
                <span class="item-name">{{item.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import BScroll from 'better-scroll'
import Singer from 'base/class/Singer'
export default {
  data () {
    return {
      singerList: {}
    }
  },
  computed: {
    hasSingerList () {
      return this.singerList.length
    }
  },
  created () {
    this._getSingerList()
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper)
    console.log(this.scroll)
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        this._normalize(res.data.list)
      })
    },
    _normalize (data) {
      let list = {}
      let HotList = []
      let HotLen = 10
      data.forEach((item, index) => {
        if (index < HotLen) {
          HotList.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        }
        if (!list[item.Findex]) {
          list[item.Findex] = []
        }
        list[item.Findex].push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      })
      let ret = Object.keys(list)
      ret.sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0)
      })
      let singerList = [{
        item: HotList,
        title: '热门'
      }]
      ret.forEach((letter) => {
        singerList.push({
          item: list[letter],
          title: letter
        })
      })
      this.singerList = singerList
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .wrapper
    position fixed
    top 88px
    bottom 0
    width 100%
    overflow hidden
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background #333
      .list-group-item
        display flex
        line-height 50px
        padding 20px 0 0 30px
        .item-img
          width 50px
          height 50px
          border-radius 50%
        .item-name
          flex 1
          font-size $font-size-medium
          color $color-text-l
          margin-left 20px
</style>
