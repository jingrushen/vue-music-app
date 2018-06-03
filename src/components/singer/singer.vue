<template>
  <div class="singer" ref="singer">
    <list-view :singerList='singerList' :ret='ret' @select='selectItem' ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>

import ListView from 'base/listview/listview'

import { mapMutations } from 'vuex'

import Singer from 'base/class/Singer'
import { getSingerList } from 'api/singer'
import { CODE } from 'api/config'

import pinyin from 'pinyin'
import { playlistMixin } from 'common/js/mixin'

export default {
  mixins: [playlistMixin],
  data () {
    return {
      singerList: [],
      ret: ['热']
    }
  },
  computed: {

  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.data.code === CODE) {
          let singerList = res.data.artists
          this._normalize(this._addTitle(singerList))
        }
      })
    },
    _addTitle (data) {
      let len = data.length
      for (let i = len - 1; i >= 0; i--) {
        let l = pinyin(data[i].name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        })[0][0].toUpperCase()
        if (/[^A-Z]/.test(l)) {
          data.splice(i, 1)
        } else {
          data[i].title = l
        }
      }
      return data
    },
    _normalize (data) {
      let list = {}
      let HotList = []
      let HotLen = 10
      data.forEach((item, index) => {
        if (index < HotLen) {
          HotList.push(new Singer(item))
        }
        if (!list[item.title]) {
          list[item.title] = []
        }
        list[item.title].push(new Singer(item))
      })
      let ret = Object.keys(list)
      ret.sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0)
      })
      let singerList = [{
        item: HotList,
        title: '热门'
      }]
      ret.forEach((letter) => {
        singerList.push({
          item: list[letter],
          title: letter
        })
      })
      this.ret.push(...ret)
      this.singerList = singerList
    },
    selectItem (item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setItem(item)
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    ...mapMutations({
      setItem: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
  .singer
    position absolute
    left 0
    right 0
    top 88px
    bottom 0
    overflow hidden
</style>
