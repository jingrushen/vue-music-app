<template>
  <div class="progress-bar">
    <div class="bar-inner" ref="bar" @click='btnClick'>
      <div class="progress" ref="progress"></div>
      <div class="progress-btn" ref="btn"
        @touchstart.prevent='btnTouchStart'
        @touchmove.prevent='btnTouchMove'
        @touchend='btnTouchEnd'
      ></div>
    </div>
  </div>
</template>

<script>
const BTN_WIDTH = 16

export default {
  props: {
    percent: {
      type: Number
    }
  },
  watch: {
    percent (p) {
      this.setProgress(p)
    }
  },
  methods: {
    setProgress (p) {
      if (this.touch.move) {
        return
      }
      let offSetWidth = (this.$refs.bar.clientWidth - BTN_WIDTH) * p
      this._setOffsetW(offSetWidth)
    },
    btnTouchStart (e) {
      this.touch.move = true
      this.touch.initX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    btnTouchMove (e) {
      let diff = e.touches[0].pageX - this.touch.initX
      let offSetWidth = Math.max(Math.min(diff + this.touch.left, (this.$refs.bar.clientWidth - BTN_WIDTH)), 0)
      this._setOffsetW(offSetWidth)
      this._calPercent(offSetWidth)
    },
    btnTouchEnd () {
      this.touch.move = false
      this._calPercent(this.$refs.progress.clientWidth)
    },
    btnClick (e) {
      if (e.target === this.$refs.btn) {
        return
      }
      let offSetWidth = e.offsetX
      this._setOffsetW(offSetWidth)
      this._calPercent(offSetWidth)
    },
    _calPercent (w) {
      let p = w / (this.$refs.bar.clientWidth - BTN_WIDTH)
      this._setPercent(p)
    },
    _setPercent (p) {
      this.$emit('setPercent', p, this.touch.move)
    },
    _setOffsetW (w) {
      this.$refs.progress.style.width = w + 'px'
      this.$refs.btn.style.transform = `translate3d(${w}px,0,0)`
    }
  },
  created () {
    this.touch = {}
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .progress-bar
    width 100%
    .bar-inner
      height 4px
      background $color-text-d
      position relative
      .progress
        height 4px
        width 0
        background $color-theme
      .progress-btn
        position absolute
        top -6px
        box-sizing border-box
        width 16px
        height 16px
        border-radius 50%
        border 3px solid $color-text-d
        background $color-theme
</style>
