/**
 * Created by Yinxiong on 2016/12/7.
 */

import Response from '../../../externals/Response';
import {PAD_SIZE} from '../const';

const sidebar = {
	pad: 'pad-screen',
	web: 'web-screen',
	hidden: 'hidden-sidebar',
	float: 'float-sidebar'
};

export default {
	data(){
		return {
			isWeb: false,
			isPad: false,
			isOpen: false
		}
	},
	computed: {
		responseClass(){
			return {
				[sidebar.web]: this.isWeb,
				[sidebar.pad]: !this.isWeb,
				[sidebar.hidden]: this.isWeb && !this.isOpen,
				[sidebar.float]: !this.isWeb && this.isOpen
			}
		}
	},
	created(){
		Response.create({
			prop: "width",
			prefix: "min-width- r src",
			breakpoints: [PAD_SIZE, 0],
			lazy: true
		});
	},
	mounted(){
		Response.crossover('width', () => {
			this.checkResponse();
		});

		this.checkResponse();
	},
	methods: {
		checkResponse(){
			if (Response.band(PAD_SIZE)) {
				this.isWeb = true;
				this.isOpen = true;
			} else if (Response.band(0, PAD_SIZE)) {
				this.isWeb = false;
				this.isOpen = false;
			}
		},
		toggleNav(){
			this.isOpen = !this.isOpen;
		}
	}
}