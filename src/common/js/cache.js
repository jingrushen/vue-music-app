import storage from './stroage'

const SEARCH_KEY = '__search__'
const MAX_SEARCH_KEY_NUM = 15

function insertArray (arr, val, compare, maxLen) {
  let index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, MAX_SEARCH_KEY_NUM)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch (index) {
  let searches = storage.get(SEARCH_KEY, [])
  searches.splice(index, 1)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}
