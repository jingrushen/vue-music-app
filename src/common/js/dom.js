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
