<template>
  <div class="progress-circle">
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 100 100' :width='radius' :height='radius'>
      <circle class="progress-bg" fill='transparent' r='50' cx='50' cy='50'></circle>
      <circle class="progress-bar" :stroke-dasharray='dasharray' fill='transparent' :stroke-dashoffset='dashoffset'  r='50' cx='50' cy='50'></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dasharray: Math.PI * 2 * 50
    }
  },
  computed: {
    dashoffset () {
      return (1 - this.percent) * this.dasharray
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .progress-circle
    position relative
    circle
      stroke-width 8px
      transform-origin center
      &.progress-bg
        stroke $color-background-d
        transform scale(0.9)
      &.progress-bar
        transform scale(0.9) rotate(-90deg)
        stroke $color-theme
</style>
