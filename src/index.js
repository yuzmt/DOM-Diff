/*
 * @Description: Do not edit
 * @Author: 24333 (mengting.zhang@hand-china.com)
 * @Date: 2022-08-29 10:57:20
 */
import { createElement, render, renderDom } from './element';
import diff from './diff';
import patch from './patch'
import './App.css'

let virtualDom = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['HTML']),
  createElement('li', {class: 'item'}, ['CSS']),
  createElement('li', {class: 'item'}, ['JS']),
])

console.log(virtualDom)
let el = render(virtualDom);

renderDom(el, document.getElementById('root'))

let virtualDom2 = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item active'}, ['HTML1']),
  createElement('li', {class: 'item'}, ['CSS1']),
  createElement('li', {class: 'item'}, ['JS1']),
])

let patches = diff(virtualDom, virtualDom2)
console.log('patches', patches);
patch(el, patches)