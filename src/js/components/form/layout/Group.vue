<template>
    <div class="form-group" :class="{row: isGrid, hidden: type == COMPONENT.HIDDEN || hidden }">
        <label :class="labelClass" v-text="label" v-if="label"></label>
        <div class="form-content" :class="controlClass">
            <slot name="control"></slot>
            <small class="form-text text-muted" v-text="hint" v-if="hint"></small>
        </div>
    </div>
</template>

<script>
    import {COMPONENT} from '../const';
    import _ from 'lodash';
    import Vue from 'vue';

    const COL_LABEL = [COMPONENT.CHECKBOX, COMPONENT.RADIO_GROUP, COMPONENT.CHECKBOX_GROUP];

    export default {
        name: 'FormGroup',
        data(){
            return {
                COMPONENT,
                isGrid: _.get(this.options, 'grid', false),
                labelSize: _.get(this.options, 'labelSize', 4),
                controlSize: _.get(this.options, 'controlSize', -1),
            }
        },
        props: {
            container: Vue,
            options: Object,
            hidden: Boolean,
            label: String,
            type: [Number, String],
            hint: String
        },
        computed: {
            labelClass(){
                return {
                    ['col-sm-'+this.labelSize]: this.isGrid,
                    'col-form-label': this.isGrid && COL_LABEL.indexOf(this.type) == -1
                }
            },
            controlClass(){
                let size = this.controlSize < 0 ? (12-this.labelSize) : this.controlSize;
                if(!this.label){
                    size = 12;
                }
                return {
                    // ['offset-sm-'+this.labelSize]: isOffset,
                    ['col-sm-'+size]: this.isGrid
                }
            }
        }
    }
</script>