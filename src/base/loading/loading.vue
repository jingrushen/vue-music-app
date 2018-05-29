<template>
  <div class="loading" ref="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="desc">{{desc}}</p>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    desc: {
      type: String,
      default: '正在加载中'
    }
  },
  watch: {
    height (v) {
      this.$refs.loading.style.height = v + 'px'
      this.$refs.loading.style.lineHeight = v + 'px'
    }
  }
}
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
  .loading
    position absolute
    text-align center
    width 100%
    .desc
      line-height 20px
      font-size $font-size-small
      color $color-text-l
</style>
