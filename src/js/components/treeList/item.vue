<template>
    <li :class="{'tree-group': isGroup, 'tree-active': isOpen }" class="tree-list-item">
        <a v-text="model.text" class="tree-list-link" @click="toggle"></a>
        <ul class="tree-list-children" v-show="isOpen" v-if="isGroup">
            <tree-list-item
                v-for="model in model.children"
                :model="model">
            </tree-list-item>
        </ul>
    </li>
</template>

<script>
    export default {
        name: 'TreeListItem',
        props: {
            model: Object
        },
        data(){
            return {
                isOpen: false
            }
        },
        computed: {
            isGroup(){
                return this.model.children && this.model.children.length
            }
        },
        methods: {
            toggle(){
                if(this.isGroup){
                    this.isOpen = !this.isOpen;
                }
            }
        }
    }
</script>