<template>
  <div class="song-list">
    <ul>
      <li class='list-item'
        v-for="(song, index) in hotSongs"
        :key="song.id"
        @click='selectSong(song, index)'
      >
        <div class="content">
          <h2 class="item-name">{{song.name}}</h2>
          <p class="item-desc">{{mergeNameSinger(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hotSongs: {
      type: Array
    }
  },
  methods: {
    mergeNameSinger (song) {
      return `${song.singer} ${song.desc}`
    },
    selectSong (song, index) {
      this.$emit('select', song, index)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  .song-list
    padding 15px 30px
    .list-item
      display flex
      align-items center
      height 64px
      font-size $font-size-medium
      .content
        display flex
        flex-direction column
        justify-content space-around
        line-height 25px
        overflow hidden
        .item-name
          color $color-text
          no-wrap()
        .item-desc
          color $color-text-ll
          no-wrap()
</style>
