let baseSize = 100
let baseWidth = 375
let width = document.documentElement.getBoundingClientRect().width
document.documentElement.style.fontSize = (width / baseWidth * baseSize).toFixed(2) + 'px'
