<template>
    <div>
        <div class="main-toolbar">
            <h1 class="page-title">Tree List</h1>
        </div>
        <div class="main-content">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">Tree</h5>
                        </div>
                        <div class="card-block">
                            <vue-tree-list :items="treeData"></vue-tree-list>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">Tree</h5>
                        </div>
                        <div class="card-block">
                            <vue-tree-list :items="treeData"></vue-tree-list>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vueTreeList from '../../../../components/treeList/treeList.vue';

    export default {
        name: 'TreeView',
        components: {
            vueTreeList
        },
        data(){
            return {
                treeData: [{
                    text: 'Category'
                }, {
                    text: 'Home',
                    children: [{
                        text: 'sub'
                    }, {
                        text: 'sub2',
                        children: [{
                            text: 'sub'
                        }, {
                            text: 'sub2'
                        }]
                    }]
                }, {
                    text: 'Category 2'
                }]
            }
        }
    }
</script>