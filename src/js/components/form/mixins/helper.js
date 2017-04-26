/**
 * Created by Yinxiong on 2016/10/13.
 */

export default {
	methods: {
		getComponent(name){
			return this.$refs.fields.find(o=>o.name==name);
		}
	}
}