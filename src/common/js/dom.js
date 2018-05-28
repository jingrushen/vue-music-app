export function addClass (ele, className) {
  if (!hasClass(ele, className)) {
    let newClass = ele.className.split(/\s+/)
    newClass.push(className)
    ele.className = newClass.join(' ')
  }
}

export function hasClass (ele, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(ele.className)
}

export function getData (ele, name, val) {
  let prefix = 'data-'
  name = prefix + name
  if (!val) {
    return ele.getAttribute(name)
  } else {
    ele.setAttribute(name, val)
  }
}
