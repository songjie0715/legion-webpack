<template>
    <div>
        <h5 v-if="options.text" class="m-t-2 m-b-0" v-text="options.text"></h5>
        <hr />
    </div>
</template>

<script>
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';

    export default {
        name: getName(COMPONENT.DIVIDER),
        Type: COMPONENT.DIVIDER,
        mixins: [mixin],
        props: {
            name: {
                type: String,
                required: false
            }
        }
    }
</script>
