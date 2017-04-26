<template>
    <button
        ref="control"
        class="btn"
        :class="['btn-'+size, 'btn-'+style, {disabled: isDisabled} ]"
        v-text="text"
        @click="trigger('click')"
    >
    </button>
</template>

<script>
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';
    import _ from 'lodash';

    export default {
        name: getName(COMPONENT.BUTTON),
        Type: COMPONENT.BUTTON,
        mixins: [mixin],
        props: {
            name: {
                required: false
            }
        },
        data(){
            return {
                text: _.get(this.options, 'text', '确定'),
                size: _.get(this.options, 'size', 'normal'),
                style: _.get(this.options, 'style', 'secondary')
            }
        }
    }
</script>