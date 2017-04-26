<template>
    <div class="form-check" :class="{ disabled: isDisabled }">
        <label class="form-check-label">
            <input type="checkbox"
                   ref="control"
                   :disabled="isDisabled"
                   class="form-check-input"
                   v-model="model"
                   :field-name="name"
                   @change="trigger('change')"
            />
            {{inputText}}
        </label>
    </div>
</template>

<script>
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';
    import _ from 'lodash';

    export default {
        name: getName(COMPONENT.CHECKBOX),
        Type: COMPONENT.CHECKBOX,
        mixins: [mixin],
        data(){
            return {
                inputText: _.get(this.options, 'text', this.text),
                inputValue: _.get(this.options, 'value', this.value)
            }
        },
        methods: {
            getInputValue(){
                return this.inputValue;
            }
        }
    }
</script>