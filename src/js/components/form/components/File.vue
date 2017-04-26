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
                   @keyup="trigger('keyup')"
            />
            <span class="input-group-addon" v-for="item in addon.right" v-text="item"></span>
        </div>

        <div class="form-control-feedback" v-for="text in feedback" v-text="text"></div>
    </div>
</template>