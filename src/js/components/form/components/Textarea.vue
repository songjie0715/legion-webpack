<template>
    <div>
        <textarea
            class="form-control"
            ref="control"
            @keyup="trigger('keyup')"
            v-model="model"
            :field-name="name"
            :cols="cols"
            :rows="rows"
            :disabled="isDisabled"
            :readonly="isReadonly">
        </textarea>
    </div>
</template>

<script>
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';
    import _ from 'lodash';

    export default {
        name: getName(COMPONENT.TEXTAREA),
        Type: COMPONENT.TEXTAREA,
        mixins: [mixin],
        data(){
            return {
                cols: _.get(this.options, 'cols', 3),
                rows: _.get(this.options, 'rows', 3)
            }
        }
    }
</script>