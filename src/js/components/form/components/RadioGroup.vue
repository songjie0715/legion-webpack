<template>
    <div>
        <div class="form-check" v-for="item in items" :class="{disabled: isDisabled || item.disabled}">
            <label class="form-check-label">
                <input type="radio"
                   class="form-check-input"
                   v-model="model"
                   :value="item.value"
                   :field-name="name"
                   :disabled="isDisabled || item.disabled"
                   @change="trigger('change')"
                />
                {{item.text}}
            </label>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';

    export default {
        name: getName(COMPONENT.RADIO_GROUP),
        Type: COMPONENT.RADIO_GROUP,
        mixins: [mixin],
        data(){
            return {
                items: []
            }
        },
        watch: {
            'options.items'(){
                this.fillOptions();
            }
        },
        created(){
            this.fillOptions();
        },
        methods: {
            fillOptions(){
                let items = _.get(this.options, 'items', []);
                if(_.isFunction(items)){
                    items.call(this).then(data=>{
                        this.items = data;
                    });
                } else {
                    this.items = items;
                }
            }
        }
    }
</script>