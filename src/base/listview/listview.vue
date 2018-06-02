<template>
  <scroll
    class="list-view"
    :data='singerList'
    :listenScroll='listenScroll'
    :probeType='probeType'
    ref="scroll"
    @scroll='scroll'
  >
    <div>
      <ul v-if="hasSingerList">
        <li
          class="list-group"
          v-for="(list, index) in singerList"
          :key="index"
          ref='listGroup'
        >
          <h2 class="list-group-title">{{list.title}}</h2>
          <ul>
            <li class="list-group-item"
              v-for="item of list.item"
              :key="item.id"
              @click='select(item)'
            >
              <img class='item-img' v-lazy="item.avater">
              <span class="item-name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="short-cut">
      <ul>
        <li
          class="short-item"
          v-for="(letter, index) in ret"
          :key="index"
          :data-index='index'
          @touchstart='OnTouchStart'
          @touchmove.stop.prevent='OnTouchMove'
          :class='{"active": currIndex===index}'
        >{{letter}}</li>
      </ul>
    </div>
    <div class="fixedItem" v-show="fixedTitle" ref='fixedItem'>
      {{fixedTitle}}
    </div>
    <div class='loading' v-show='!hasSingerList'>
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import { getData } from 'common/js/dom'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

const ITEM_H = 18
const TITLT_H = 30

export default {
  data () {
    return {
      currIndex: 0,
      listHeight: [],
      scrollY,
      diff: -1
    }
  },
  props: {
    singerList: {
      type: Array
    },
    ret: {
      type: Array
    }
  },
  computed: {
    hasSingerList () {
      return this.singerList.length
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.singerList[this.currIndex] ? this.singerList[this.currIndex].title : ''
    }
  },
  watch: {
    singerList () {
      this.$nextTick(() => {
        this._calListH()
      })
    },
    scrollY (y) {
      if (y > 0) {
        this.currIndex = 0
        return
      }
      let len = this.listHeight.length
      for (let i = 0; i < len; i++) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        if (-y >= h1 && -y < h2) {
          this.currIndex = i
          this.diff = h2 + y
          return
        }
      }
    },
    diff (y) {
      let fixedTop = (y >= 0 && y < TITLT_H) ? y - TITLT_H : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixedItem.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  created () {
    this.initY = 0
    this.listenScroll = true
    this.probeType = 3
    this.fixedTop = 0
  },
  methods: {
    select (item) {
      this.$emit('select', item)
    },
    OnTouchStart (e) {
      let index = getData(e.target, 'index')
      this.initY = e.touches[0].clientY
      this.currIndex = +index
      this.initIndex = +index
      this._scrollToElement(this.$refs.listGroup[index])
    },
    OnTouchMove (e) {
      this.posY = e.touches[0].clientY
      let diff = this.posY - this.initY
      let max = this.ret.length - 1
      this.currIndex = Math.max(Math.min(Math.ceil(this.initIndex + (diff / ITEM_H)), max), 0)
      this._scrollToElement(this.$refs.listGroup[this.currIndex])
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollToElement (index) {
      this.$refs.scroll.scrollToElement(index)
    },
    _calListH () {
      this.listHeight.push(0)
      let list = this.$refs.listGroup
      let len = list.length
      for (let i = 0; i < len; i++) {
        let h = list[i].offsetHeight + this.listHeight[i]
        this.listHeight.push(h)
      }
    },
    refresh () {
      this.$refs.scroll.refresh()
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
.list-view
  position relative
  width 100%
  height 100%
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
  .short-cut
    position absolute
    right 0
    top 50%
    transform translateY(-50%)
    width 20px
    line-height 1.5
    background $color-background-d
    padding 20px 0
    border-radius 10px
    text-align center
    color $color-text-l
    font-size $font-size-small
    z-index 2
    .short-item
      &.active
        color $color-theme
  .fixedItem
    position absolute
    top 0
    height 30px
    line-height 30px
    width 100%
    padding-left 20px
    font-size $font-size-small
    color $color-text-l
    background #333
  .loading
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
