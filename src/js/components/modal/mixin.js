/**
 * Created by Yinxiong on 2016/9/23.
 */

export default {
	methods: {
		show() {
			this.$refs.modal.show();
			return this;
		},
		hide() {
			this.$refs.modal.hide();
			return this;
		}
	}
}