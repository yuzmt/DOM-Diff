/*
 * @Description: 虚拟DOM元素的类
 * @Author: 24333 (mengting.zhang@hand-china.com)
 * @Date: 2022-08-29 11:12:06
 */

// 虚拟DOM元素的类，构建实例对象，用来描述DOM
class Element {
	constructor(type, props, children) {
		this.type = type;
		this.props = props;
		this.children = children;
	}
}

/**
 * 创建虚拟DOM, 返回虚拟节点（object）
 * @param {*} type 指定元素的标签类型，如li, div, a
 * @param {*} props 指定元素身上的属性，如class，style, 自定义属性等
 * @param {*} children 表示指定元素是否有子节点，参数以数组的形式传入
 * @returns 
 */
function createElement(type, props, children) {
	return new Element(type, props, children);
}

// render方法可以将虚拟DOM转化成真实的DOM
function render(domObj) {
	let el = document.createElement(domObj.type);

	// 遍历props属性对象，给创建的元素el设置属性
	for(let key in domObj.props) {
		setAttr(el, key, domObj.props[key])
	}

	domObj.children.forEach(child => {
		child = (child instanceof Element) ? render(child) : document.createTextNode(child)
		// 添加到对应的元素内
		el.appendChild(child);
	})
	return el
}

/**
 * 
 * @param {*} node 元素节点
 * @param {*} key 设置的属性类型，如class, style, data等
 * @param {*} value 设置的属性值
 */
function setAttr(node, key, value) {
	switch(key) {
		case 'value':
			if(node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea') {
				node.value = value;
			} else {
				node.setAttribute(key, value)
			}
			break;
		case 'style':
			// 直接赋值行内样式
			node.style.cssText = value;
			break;
		default: 
			node.setAttribute(key, value)
			break;
	}
}

// 将元素插入到页面内
function renderDom(el, target) {
	target.appendChild(el)
}

export {
	Element,
	createElement,
	render,
	setAttr,
	renderDom
}