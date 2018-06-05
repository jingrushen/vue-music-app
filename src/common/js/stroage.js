let store = {
  storage: window.localStorage,
  session: {
    storage: window.sessionStorage
  }
}

const api = {
  get (key, def) {
    if (this.disabled) {
      return
    }
    let value = deserialize(this.storage.getItem(key))
    return (value === undefined ? def : value)
  },
  set (key, val) {
    if (this.disabled) {
      return
    }
    if (val === undefined) {
      return this.storage.remove(key)
    }
    this.storage.setItem(key, serialize(val))
  },
  remove (key) {
    if (this.disabled) {
      return
    }
    this.storage.removeItem(key)
  }
}

Object.assign(store, api)
Object.assign(store.session, api)

function serialize (val) {
  return JSON.stringify(val)
}

function deserialize (val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (error) {
    return val || undefined
  }
}

try {
  const testkey = '__test__'
  store.set(testkey, testkey)
  if (store.get(testkey) !== testkey) {
    store.disabled = true
  }
  store.remove(testkey)
} catch (error) {
  store.disabled = true
}

export default store
