export function getRandamInt (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function shuffle (_arr) {
  let arr = _arr.slice()
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let j = getRandamInt(0, len)
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}

export function deepClone (target) {
  if (typeof target !== 'object' || !target) {
    return target
  }
  if (target instanceof Number ||
    target instanceof Boolean ||
    target instanceof String ||
    target instanceof Date
  ) {
    return target
  }

  let t = target.constructor === Array ? [] : {}
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      t[key] = deepClone(target[key])
    }
  }
  return t
}

export function lyricParse (lyric) {
  var lines = lyric.split(/\s(?=\[)/)
  const timeExp = /\[(\d+):(\d+)\.(\d+)\]/
  let lyc = []
  for (let i = 0; i < lines.length; i++) {
    let arr = timeExp.exec(lines[i])
    if (arr) {
      let time = +arr[1] * 60 * 1000 + arr[2] * 1000 + (+arr[3])
      let txt = lines[i].replace(timeExp, '')
      lyc.push({
        time,
        txt
      })
    }
  }
  return lyc
}
