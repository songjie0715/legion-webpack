/**
 * Created by Yinxiong on 2016/11/17.
 */

import {MAX_SIZE} from './const/index';

export default class CanvasView {
	constructor(el){
		this.$el = el;
		this.ctx = this.$el.getContext('2d');
	}
	setOpacity(value){
		this.$el.style.opacity = value/100;
	}
	setSize(width, height){
		this.$el.width = Math.min(width, MAX_SIZE);
		this.$el.height = Math.min(height, MAX_SIZE);
		return this;
	}
	show(){
		this.$el.style.display = '';
	}
	hide(){
		this.$el.style.display = 'none';
	}
	clear(){
		this.ctx.clearRect(0, 0, this.$el.width, this.$el.height);
		return this;
	}
}