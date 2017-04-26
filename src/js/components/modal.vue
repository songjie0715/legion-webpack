<template>
    <div class="modal fade">
        <div class="modal-dialog" :class="[size ? 'modal-'+size : '']">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="title"><i class="fa modal-icon" v-if="icon" :class="['fa-'+icon]"></i>{{title}}</h5>
                    <p class="modal-text" v-if="subtitle" v-text="subtitle"></p>
                    <button type="button" class="close" @click="hide">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <p>One fine body&hellip;</p>
                    </slot>
                </div>
                <div class="modal-footer" v-if="!noFooter">
                    <slot name="footer">
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap';
    import $ from 'jquery';

    export default {
        name: 'BootstrapModal',
        props: {
            title: {
                type: String,
                default: 'Modal',
                required: true
            },
            size: {
                type: String,
                //[lg, sm]
                default: ''
            },
            subtitle: String,
            icon: {
                type: String
            },
            noFooter: {
                type: Boolean,
                default: false
            },
            options: Object
        },
        mounted(){
            this.$modal = $(this.$el).modal(Object.assign({
                show: false
            }, this.options));

            this.$modal.on('show.bs.modal', (e)=>{
                this.$emit('show', e);
            });

            this.$modal.on('shown.bs.modal', (e)=>{
                this.$emit('shown', e);
            });

            this.$modal.on('hide.bs.modal', (e)=>{
                this.$emit('hide', e);
            });

            this.$modal.on('hidden.bs.modal', (e)=>{
                this.$emit('hidden', e);
            });
        },
        methods: {
            show() {
                this.$modal.modal('show');
                return this;
            },
            hide() {
                this.$modal.modal('hide');
                return this;
            }
        }
    }
</script>