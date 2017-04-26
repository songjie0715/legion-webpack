<template>
    <div :class="[feedbackClass]">
        <div class="input-group">
            <span class="input-group-addon" v-for="item in addon.left" v-text="item"></span>
            <input v-if="type == INPUT_TYPE.TEXT" ref="control" type="text" v-model="model" class="form-control"
                   :class="[inputFeedbackClass]"
                   :field-name="name"
                   :readonly="readonly"
                   :disabled="isDisabled"
                   :placeholder="options.placeholder"
                   @keyup="trigger('keyup', $event)"
            />
            <input v-if="type == INPUT_TYPE.PASSWORD" ref="control" type="password" v-model="model" class="form-control"
                   :class="[inputFeedbackClass]"
                   :field-name="name"
                   :readonly="readonly"
                   :disabled="isDisabled"
                   :placeholder="options.placeholder"
                   @keyup="trigger('keyup', $event)"
            />
            <input v-if="type == INPUT_TYPE.NUMBER" ref="control" type="number" v-model="model" class="form-control"
                   :class="[inputFeedbackClass]"
                   :field-name="name"
                   :readonly="readonly"
                   :disabled="isDisabled"
                   :placeholder="options.placeholder"
                   @keyup="trigger('keyup', $event)"
            />
            <span class="input-group-addon" v-for="item in addon.right" v-text="item"></span>
        </div>

        <div class="form-control-feedback" v-for="text in feedback" v-text="text"></div>
    </div>
</template>

<script>
    import {COMPONENT, INPUT_TYPE} from '../const';
    import {getName} from '../utils';
    import _ from 'lodash';
    import mixin from '../mixins/component';

    export default {
        name: getName(COMPONENT.INPUT),
        Type: COMPONENT.INPUT,
        mixins: [mixin],
        data(){
            return {
                INPUT_TYPE,
                addon: _.get(this.options, 'addon', {}),
                type: _.get(this.options, 'type', INPUT_TYPE.TEXT)
            }
        },
        computed: {
            inputFeedbackClass(){
                return {
                    'form-control-success': this.needValidate && this.isValid,
                    'form-control-warning': this.needValidate && !this.isValid
                }
            }
        }
    }
</script>