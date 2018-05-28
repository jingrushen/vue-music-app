<template>
  <transition name='fade'>
    <div class="music-list">
      <div class="back-icon">
        <i class="icon-back"></i>
      </div>
      <h1 class='title'>薛之谦</h1>
      <div class="bg-image"></div>
      <div class="list">
        <div class="song-list">
          <ul>
            <li class="song-item">
              <h2 class="item-name">哑巴</h2>
              <p class="item-desc">薛之谦·哑巴</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

import { getSingerDetail } from 'api/singer'

export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getSingerDetail(this.singer.id)
  },
  methods: {
    _getSingerDetail (id) {
      if (!id) {
        this.$router.push({
          path: '/singer'
        })
      }
      getSingerDetail(id).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .fade-enter-active, .fade-leave-active
    transition transform .3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
  .music-list
    position fixed
    top 0
    right 0
    left 0
    bottom 0
    background $color-background
    z-index 99
</style>
