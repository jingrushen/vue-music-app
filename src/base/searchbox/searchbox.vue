<template>
  <div class="search-box">
    <i class="icon icon-search"></i>
    <input class="box" v-model='query' :placeholder="placeholder" ref="input"/>
    <i class="icon icon-dismiss" v-show="hasQuery" @click='clear'></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲/歌手'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    query (val) {
      this.$emit('changeQuery', val)
    }
  },
  computed: {
    hasQuery () {
      return !!this.query
    }
  },
  methods: {
    setQuery (val) {
      this.query = val
    },
    clear () {
      this.query = ''
    },
    blurInput () {
      this.$refs.input.blur()
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .search-box
    display flex
    align-items center
    box-sizing border-box
    width 100%
    border-radius 6px
    background $color-highlight-background
    height 40px
    padding 5px 10px
    .icon
      font-size $font-size-large-x
      color $color-background
      &.icon-dismiss
        font-size $font-size-medium-x
    .box
      flex 1
      line-height 16px
      color $color-background
      background $color-highlight-background
      outline none
      font-size $font-size-medium
      margin 0 5px
</style>
