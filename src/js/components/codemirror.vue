<template>
    <div class="code-mirror-wrapper font-size-14px">
        <textarea ref="textarea" style="display:none" v-model="value"></textarea>
    </div>
</template>

<style>
    .CodeMirror {
        background: #f8f8f8!important;
        font-family: Consolas,Arial,serif!important;
    }
</style>

<script>
    import CodeMirror from 'codemirror';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/mode/javascript/javascript';
    
    export default {
        name: 'CodeMirrorComponent',
        props: {
            content: String,
            config: Object,
            mode: {
                type: String,
                default: 'javascript'
            }
        },
        watch: {
            content(){
                if(this.codeMirror){
                    this.codeMirror.setValue(this.content || '')
                }
            }
        },
        data(){
            return {
                value: this.content
            }
        },
        created(){
            this.codeMirror = null;
        },
        mounted(){
            let mode = this.mode;
            if(mode == 'javascript'){
                mode = {
                    name: this.mode,
                    json: true
                }
            }

            this.codeMirror = CodeMirror.fromTextArea(this.$refs.textarea, Object.assign({
                viewportMargin: Infinity,
                mode: mode
            }, this.config));
        },
        destroyed(){
            this.destroy();
        },
        methods: {
            destroy(){
                if(this.codeMirror){
                    this.codeMirror.setValue('');
                    this.codeMirror.clearHistory();
                    this.codeMirror.toTextArea();
                    this.codeMirror = null;
                }
            },
            getValue(){
                return this.codeMirror.getValue();
            }
        }
    }
</script>