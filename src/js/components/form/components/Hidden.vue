<template>
    <input type="hidden" :field-name="name" ref="control" v-model="model" />
</template>

<script>
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';

    export default {
        name: getName(COMPONENT.HIDDEN),
        Type: COMPONENT.HIDDEN,
        mixins: [mixin]
    }
</script>