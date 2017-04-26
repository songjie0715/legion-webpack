<template>
    <div :class="[feedbackClass]">
        <input type="file" ref="file" @change="trigger('selectFile',$event)" class="hidden" />
        <div class="input-group">
            <input ref="control"
                   type="text"
                   v-model="model"
                   class="form-control"
                   :class="[inputFeedbackClass]"
                   :field-name="name"
                   :readonly="readonly"
                   :disabled="isDisabled"
                   :placeholder="options.placeholder"
                   @keyup="trigger('keyup')"
            />
            <span class="input-group-btn">
                <button class="btn btn-secondary" @click="$refs.file.click()">选择文件</button>
            </span>
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
		name: getName(COMPONENT.UPLOADER),
		Type: COMPONENT.UPLOADER,
		mixins: [mixin],
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