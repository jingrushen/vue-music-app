<template>
  <div class="loading" ref="loading">
    <img src="./loading.gif" width="24" height="24">
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 0
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
  .loading
    text-align center
    width 100%
</style>
