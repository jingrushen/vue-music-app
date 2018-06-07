<template>
  <div class="tab">
    <router-link tag="div" to='/recommend' class="tab-item">
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" to='/singer' class="tab-item">
      <span class="tab-link">独家歌手</span>
    </router-link>
    <router-link tag="div" to='/rank' class="tab-item">
      <span class="tab-link">排行榜</span>
    </router-link>
    <router-link tag="div" to='/search' class="tab-item">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .tab
    display flex
    font-size $font-size-medium
    line-height 44px
    height 44px
    .tab-item
      flex 1
      text-align center
      &.router-link-active,.tab-item
        background $color-theme
        .tab-link
          color $color-background
      .tab-link
        color $color-text-l
</style>
