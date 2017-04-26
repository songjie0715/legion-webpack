<template>
    <div>
        <div class="main-toolbar">
            <h1 class="page-title">Notify</h1>
        </div>
        <div class="main-content">
            <button class="btn btn-info" @click="notify('Info')">Information</button>
            <button class="btn btn-success" @click="notify('Success', 'success')">Success</button>
            <button class="btn btn-danger" @click="notify('Error', 'error')">Error</button>
            <button class="btn btn-warning" @click="notify('Warning', 'warning')">Warning</button>
            <button class="btn btn-secondary" @click="notify('Alert', 'alert')">Alert</button>
        </div>
    </div>
</template>

<script>
    import notify from '../../../../components/notify';

    export default {
        name: 'Notify',
        methods: {
            notify(text, type, options){
                notify(text, type, options);
            }
        }
    }
</script>