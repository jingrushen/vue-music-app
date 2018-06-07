<template>
  <div class="m-header">
    <h1 class="text">MusicPlayer</h1>
  </div>
</template>

<script>
export default {
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  .m-header
    height 44px
    text-align center
    color $color-background
    font-size 0
    background $color-theme
    .text
      display inline-block
      font-size $font-size-large
      line-height 44px
      vertical-align top
</style>
