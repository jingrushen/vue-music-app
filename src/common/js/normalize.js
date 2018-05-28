export function param (data) {
  if (!data) {
    return
  }
  let url = ''
  for (var key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
