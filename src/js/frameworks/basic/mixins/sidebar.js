/**
 * Created by Yinxiong on 2016/11/17.
 */

import $ from 'jquery';
import Ps from 'perfect-scrollbar';
import {NAV_ACTIVE_ITEM_CLASS, NAV_ACTIVE_LINK_CLASS, NAV_OPEN_ITEM_CLASS} from '../const';
import {delay} from 'helper.js';


export default {
	watch: {
		$route() {
			this.change();
		}
	},
	mounted(){
		this.openedMenu = [];

		this.$nav = $(this.$refs.navList);
		this.timer = null;

		this.$nav.on('click', 'a:not([ignore])', function () {
			const target = $(this);
			const subList = target.next();
			if (subList.length) {
				const li = target.parent();
				if (!li.hasClass(NAV_ACTIVE_ITEM_CLASS)) {
					if (li.hasClass(NAV_OPEN_ITEM_CLASS)) {
						subList.stop().slideUp('fast', () => {
							li.removeClass(NAV_OPEN_ITEM_CLASS);
						})
					} else {
						li.addClass(NAV_OPEN_ITEM_CLASS);
						subList.stop().slideDown('fast');
					}
				}
			}
		});

		this.change();

        Ps.initialize(this.$refs.sidebar, {
			theme: 'primary-sidebar'
		});
	},
	methods: {
		change(){
			clearTimeout(this.timer);

			this.timer = delay(() => {
				this.activeItem();
			}, 150);
		},
		activeItem(){
			let openedMenu = [];
			let activeItem = this.$nav.find('.' + NAV_ACTIVE_LINK_CLASS);
			let parent = activeItem.parent();
			parent.addClass(NAV_ACTIVE_ITEM_CLASS);

			openedMenu.push(parent[0]);

			while (true) {
				parent = parent.parent().parent();
				parent.find(' > .nav-sub-list').slideDown('fast');
				if (parent.is('li')) {
					openedMenu.push(parent.addClass(NAV_ACTIVE_ITEM_CLASS + ' ' + NAV_OPEN_ITEM_CLASS)[0]);
					parent.parent().slideDown();
				} else {
					break;
				}
			}

			this.openedMenu.forEach(o => {
				if (openedMenu.indexOf(o) == -1) {
					let x = $(o);
					x.find('.nav-sub-list').hide();
					x.removeClass(NAV_ACTIVE_ITEM_CLASS + ' ' + NAV_OPEN_ITEM_CLASS);
				}
			});
			this.openedMenu = openedMenu;
		}
	}
}