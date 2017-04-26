<template>
    <div>
        <filter-button
            v-for="item in options.items"
            ref="fields"
            :name="item.name"
            :text="item.text"
            :options="item.options"
            :events="item.events"
            :class="item.class"
            :container="container"
        >
        </filter-button>
    </div>
</template>

<script>
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import FilterButton from './Button.vue';
    import mixin from '../mixins/component';
    import helper from '../mixins/helper';

    export default {
        name: getName(COMPONENT.BUTTON_GROUP),
        Type: COMPONENT.BUTTON_GROUP,
        mixins: [mixin, helper],
        props: {
            name: {
                required: false
            }
        },
        components: {
            FilterButton
        }
    }

</script>