<template>
  <transition name="fade">
    <div class="comfirm-wrapper" v-show="show">
      <div class="comfirm-content">
        <div class="comfirm">
          <p class="text">{{title}}</p>
          <div class="operate">
            <div class="btn left" @click.stop='cancel'>{{leftText}}</div>
            <div class="btn right" @click.stop='comfirm'>{{rightText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    title: {
      type: String,
      default: '确定删除吗'
    },
    leftText: {
      type: String,
      default: '取消'
    },
    rightText: {
      type: String,
      default: '确定'
    }
  },
  methods: {
    toggleDisplay () {
      this.show = !this.show
    },
    cancel () {
      this.show = false
      this.$emit('cancel')
    },
    comfirm () {
      this.show = false
      this.$emit('clearAll')
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.comfirm-wrapper
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background $color-background-d
  z-index 1000
  &.fade-enter-active
    animation: confirm-fadein .3s
    .comfirm
      animation confirm-zoom .3s
  .comfirm-content
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    width 270px
    .comfirm
      border-radius 13px
      background $color-highlight-background
      .text
        line-height 25px
        text-align center
        color $color-text-l
        padding 20px
        font-size $font-size-large
      .operate
        display flex
        align-items center
        text-align center
        color $color-text-d
        font-size $font-size-medium
        .btn
          flex 1
          border-top 1px solid $color-background-d
          padding 10px 0
          &.left
            border-right 1px solid $color-background-d
@keyframes confirm-zoom
  0%
    transform: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
@keyframes confirm-fadein
  0%
    opacity: 0
  100%
    opacity: 1
</style>
