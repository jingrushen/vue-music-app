<template>
  <div class="search-hot">
    <h1 class="title">热门搜索</h1>
    <ul class="hot-key">
      <li class="key" v-for="(item, index) in keys" :key="index">
        <span>{{item.first}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    keys: {
      type: Array
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .search-hot
    .title
      font-size $font-size-medium
      color $color-text-l
      margin-bottom 20px
    .hot-key
      display flex
      flex-wrap wrap
      .key
        padding 8px
        font-size $font-size-medium
        background $color-highlight-background
        border-radius 6px
        margin-right 10px
        margin-bottom 10px
        color $color-text-d
</style>
