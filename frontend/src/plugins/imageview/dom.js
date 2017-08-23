export function createDom(tpl) {
  
  let element = document.createElement('div')
  element.innerHTML = tpl
  return element.childNodes[0]
}

export function printf(str) {
  let args = [].slice.call(arguments, 1);
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ?
      args[number] : match;
  })
  
}

export function addEvent(el, type, fn, capture) {
  el.addEventListener(type, fn, !!capture)
}

export function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, !!capture)
}
