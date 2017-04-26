/**
 * Created by Yinxiong on 2017/1/18.
 */

export default {
    props: {
        //line, pie ...
        type: String,
        height: {
            type: String,
            default: '500px'
        },
        config: [Object, Function],
        auto: {
            type: Boolean,
            default: true
        }
    },
    data(){
        this.chart = null;
        return {};
    },
    beforeDestroy(){
        this.destroy();
    },
    mounted(){
        if(this.auto) {
            this.render(this.config)
        }
    },
    methods: {
        render(config){
            this.destroy();
        },
        destroy(){},
        resize(){},
        getConfig(config){
            if(typeof config == 'function'){
                return config()
            }
            return config;
        }
    }
}