export function createDom(tpl){
	let container = document.createElement('div')
	container.innerHtml = tpl
	return container.childNodes[0]
}