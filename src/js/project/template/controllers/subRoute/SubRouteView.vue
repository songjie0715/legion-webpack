<template>
    <div>
        <div class="main-toolbar">
            <h1 class="page-title">Sub route</h1>
        </div>
        <div class="main-content">
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <router-link to="/sub-routes/sub-1" class="nav-link" active-class="active">Sub 1</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/sub-routes/sub-2" class="nav-link" active-class="active">Sub 2 with Async</router-link>
                        </li>
                    </ul>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SubRouterView'
    }
</script>