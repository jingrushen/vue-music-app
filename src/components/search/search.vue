<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box></search-box>
    </div>
    <div class="search-hot-wrapper">
      <search-hot v-if="hasHotKeys" :keys='hotKeys'></search-hot>
    </div>
  </div>
</template>

<script>
import SearchBox from 'base/searchbox/searchbox'
import SearchHot from 'base/searchhot/searchhot'
import { getHotKeys } from 'api/search'
import { CODE } from 'api/config'

export default {
  data () {
    return {
      hotKeys: []
    }
  },
  computed: {
    hasHotKeys () {
      return !!this.hotKeys.length
    }
  },
  created () {
    this._getHotKeys()
  },
  methods: {
    _getHotKeys () {
      getHotKeys().then((res) => {
        if (res.data.code === CODE) {
          const data = res.data.result.hots
          this.hotKeys = data
        }
        console.log(res)
      })
    }
  },
  components: {
    SearchBox,
    SearchHot
  }
}
</script>

<style lang='stylus' scoped>
  .search
    .search-box-wrapper
      margin 20px
    .search-hot-wrapper
      margin 20px
</style>
