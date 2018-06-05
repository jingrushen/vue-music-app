<template>
  <div class="search-list">
    <transition-group name="fade" tag="ul">
      <li class="search-item" v-for="(item, index) in searchData" :key="item" @click='selectItem(item)'>
        <span class="text">{{item}}</span>
        <span class="icon">
          <i class="icon-delete" @click.stop='deleteData(index)'></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    searchData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem (index) {
      this.$emit('selectHistory', index)
    },
    deleteData (index) {
      this.$emit('deleteHistory', index)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .search-list
    .search-item
      height 30px
      font-size $font-size-medium
      color $color-text-l
      display flex
      align-items center
      overflow hidden
      &.fade-leave-active, &.fade-enter-active
        transition all .1s
      &.fade-leave-to, &.fade-enter
        height 0
      .text
        flex 1
</style>
