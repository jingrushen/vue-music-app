<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot, index) in dots" :key="index" :class="{active: currIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  data () {
    return {
      dots: [],
      children: [],
      currIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: true,
      default: 3000
    }
  },
  mounted () {
    this.$nextTick(function () {
      this._setSliderWidth()
      this._initDot()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
      window.addEventListener('resize', this._resize)
    })
  },
  activated () {
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated () {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let len = this.children.length

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < len; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += sliderWidth * 2
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDot () {
      this.dots = new Array(this.children.length)
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.1,
          speed: 400
        },
        bounce: false
      })

      this.slider.on('scrollEnd', this._scrollEnd)
      this.slider.on('touchEnd', () => {
        if (this.autoPlay) {
          this._play()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _scrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX
      this.currIndex = pageIndex

      if (this.autoPlay) {
        clearTimeout(this.timer)
        this._play()
      }
    },
    _play () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    _resize () {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this._setSliderWidth(true)
        this.slider.refresh()
        this._play()
      }, 60)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .slider
    min-height: 1px
    position relative
    overflow hidden
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position absolute
      right 0
      left 0
      bottom 12px
      font-size 0
      text-align center
      .dot
        display inline-block
        width 8px
        height 8px
        border-radius 50%
        background $color-text-l
        margin-right 4px
        margin-left 4px
        &.active
          width 20px
          border-radius 5px
          background $color-highlight-background
</style>
