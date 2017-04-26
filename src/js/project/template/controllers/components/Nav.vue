<template>
    <div>
        <div class="main-toolbar">
            <h1 class="page-title"><a href="http://v4-alpha.getbootstrap.com/components/navbar/" target="_blank">Nav</a>
            </h1>
            <p class="description">
                Navigation available in Bootstrap share general markup and styles, from the base .nav class to the
                active and disabled states. Swap modifier classes to switch between each style.
            </p>
        </div>
        <div class="main-content">
            <div class="row">
                <div class="col-12 mb-3">
                    <div class="card">
                        <div class="card-header">
                            <vue-tabs class="nav-pills" :items="tabs"></vue-tabs>
                        </div>
                        <div class="card-block">
                            Content
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <div class="card">
                        <div class="card-header">
                            <vue-tabs class="nav-tabs card-header-tabs pull-xs-left" :items="tabs"></vue-tabs>
                        </div>
                        <div class="card-block">
                            Content
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <div class="card card-tab">
                        <div class="card-header">
                            <vue-tabs class="nav-tabs nav-justified" :items="tabs" ref="tab" @on-switch="switchTab"
                                      :active="currentIndex"></vue-tabs>
                        </div>
                        <div class="card-block"
                             v-for="(item, index) in contents"
                             v-show="index == currentIndex"
                             v-text="item.content">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import vueTabs from '../../../../components/tabs.vue';

    export default {
        name: 'NavView',
        components: {
            vueTabs
        },
        data(){
            return {
                tabs: [{
                    text: 'Home'
                }, {
                    text: 'Features'
                }, {
                    text: 'Pricing'
                }, {
                    text: 'About'
                }],
                contents: [{
                    content: 'A'
                }, {
                    content: 'B'
                }, {
                    content: 'C'
                }, {
                    content: 'D'
                }],
                currentIndex: 2
            }
        },
        methods: {
            switchTab(item, index){
                this.currentIndex = index;
            }
        }
    }
</script>