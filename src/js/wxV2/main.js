/**
 * Created by janey on 15/7/19.
 */

require.config({
    paths: {
        // vue: '../../components/vue/dist/vue.min',
        vue: 'https://cdn.bootcss.com/vue/2.4.2/vue',
        core: './core/core'
    }
});

require(['vue'],function(Vue){
    // Vue.config.devtools = true;
    if ('run' in window && typeof run == 'object' && Array.isArray(run)) {
        for(var i = 0; i < run.length; i++){
            run[i]();
        }
    }
});

