<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
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
    color $color-theme
    font-size 0
    .icon
      bg-image('logo')
      background-size 30px 32px
      width 30px
      height 32px
      display inline-block
      margin-top 6px
      margin-right 9px
    .text
      display inline-block
      font-size $font-size-large
      line-height 44px
      vertical-align top
</style>
