<template>
    <div class="heatmap-control">
        <p>位置数：<span class="count" v-text="pointCount">0</span></p>
        <div class="divide"></div>
        <div class="form-group show-heatmap">
            <table>
                <tr>
                    <td>显示热图</td>
                    <td width="10"></td>
                    <td>
                        <i class="fa pointer" @click="toggleShow()" :class="{'fa-toggle-on': isShow, 'fa-toggle-off': !isShow}"></i>
                    </td>
                </tr>
            </table>
        </div>
        <div class="set-max">
            <table>
                <tr>
                    <td nowrap="nowrap">最大人数</td>
                    <td width="10"></td>
                    <td>
                        <div class="input-group">
                            <input type="number" min="0" ref="inputMax" v-model="fd.max" class="form-control" @keyup.enter="setMax" />
                            <span class="input-group-btn">
                                <button class="btn btn-main" @click="setMax"><i class="fa fa-check"></i></button>
                            </span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="color-level">
            <div class="vm-grid">
                <div class="f1">低</div>
                <div class="f1 ar">高</div>
            </div>
            <div class="slider">
                <vue-range-slider
                    :value="gradient"
                    :min="0"
                    :max="100"
                    @slide-end="setGradient"
                    horizontal-class="rangeslider--horizontal heatmap"
                    fill-class="rangeslider__fill heatmap">
                </vue-range-slider>
            </div>
        </div>
        <div class="form-group">
            <label>点半径</label>
            <div class="slider">
                <vue-range-slider :value="radius" :min="10" :max="50" @slide-end="setRadius"></vue-range-slider>
            </div>
        </div>
        <div class="form-group">
            <label>透明度</label>
            <div class="slider">
                <vue-range-slider :value="opacity" :min="0" @slide="setOpacity" :max="100"></vue-range-slider>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import vueRangeSlider from '../rangeSlider.vue';
    import {DEFAULT_MAX, DEFAULT_RADIUS, DEFAULT_OPACITY} from './const/index';
    import chroma from 'chroma-js';

    export default {
        name: 'HeatmapControl',
        components: {
            vueRangeSlider
        },
        props: {
        	pointCount: Number,
            max: {
            	type: Number,
                default: DEFAULT_MAX
            },
            opacity: {
            	type: Number,
                default: DEFAULT_OPACITY
            },
            radius: {
            	type: Number,
                default: DEFAULT_RADIUS
            },
            gradient: {
            	type: Number,
                default: 0
            }
        },
        data(){
            return {
            	isShow: false,
            	fd: {
            		max: this.max,
					opacity: this.opacity,
                    radius: this.radius,
                    gradient: this.gradient
                }
            }
        },
        methods: {
            setGradient(value){
            	if(value !== undefined ){
					this.fd.gradient = value;
				}

				let lastGradient = Object.assign({}, this.$parent.gradient);
				let colors = {
					25: 'rgba(0,0,255,.25)',
					55: 'rgba(0,255,0, .55)',
					85: 'rgba(255,255,0,.85)',
					100: 'red'
				};
				let more = 0;

				if(value > 0){
					_.some(colors, (color, v)=>{
						let key = (v/100).toFixed(2);
						if(value <= v){
							let alpha = key - key * ((value-more)/(v-more));
							lastGradient[key] = 'rgba(' + chroma(color).alpha(alpha.toFixed(2)).rgba().join(',') +')';
							return true;
						} else {
							more = v;
							lastGradient[key] = 'rgba(' + chroma(color).alpha(0).rgba().join(',') +')';
						}
					});
				}

				this.$parent.heatmapOverlay.heatmap.configure({
					radius: this.fd.radius,
					useGradientOpacity: true,
					gradient: lastGradient
				})
            },
			setRadius(value){
				if(value !== undefined){
					this.fd.radius = value;
				}
				this.$parent.heatmapOverlay.setOptions({
					radius: this.fd.radius
				});
            },
            setOpacity(value){
				if(value !== undefined){
					this.fd.opacity = value;
                }
				this.$parent.heatmapCanvas.setOpacity(this.fd.opacity);
            },
            setMax(){
				this.$parent.heatmapOverlay.heatmap.setDataMax(this.fd.max);
            },
			toggleShow(forceShow){
            	if(forceShow){
            		this.isShow = true
                } else {
					this.isShow = !this.isShow;
				}
				this.$parent.heatmapCanvas[this.isShow ? 'show' : 'hide']()
            }
        }
    }
</script>