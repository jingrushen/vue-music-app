<template>
  <div class="search-hot">
    <h1 class="title">热门搜索</h1>
    <ul class="hot-key">
      <li class="key" v-for="(item, index) in keys" :key="index" @click='clickKey(item.first)' :class="{'first': index === 0}">
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
  },
  methods: {
    clickKey (val) {
      this.$emit('clickHotkey', val)
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
        background $color-background-d
        border-radius 6px
        margin-right 10px
        margin-bottom 10px
        color $color-text-l
        &.first
          background $color-highlight-background
          color $color-background
</style>
