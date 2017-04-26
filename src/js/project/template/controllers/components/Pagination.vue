<template>
    <div>
        <div class="main-toolbar">
            <h1 class="page-title">Pagination</h1>
        </div>
        <div class="main-content">
            <p>每页10个</p>
            <pagination :total="total" class="mb-3" :per-page="pageSize" @select="pageSelect" :current-page="5" ref="page"></pagination>
            <div>
                <button class="btn btn-primary" @click="total=10">总量 10</button>
                <button class="btn btn-primary" @click="total=50">总量 50</button>
                <button class="btn btn-primary" @click="total=93">总量 93</button>
                <button class="btn btn-primary" @click="total=1600">总量 1589</button>
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from '../../../../components/pagination.vue';

    export default {
        name: 'PaginationView',
        components: {
            pagination
        },
        data(){
            return {
                total: 85,
                pageSize: 10
            }
        },
        methods: {
            pageSelect(n){
                console.log(n);
            }
        }
    }

</script>