<template>
    <aside class="primary-sidebar" id="primary-sidebar">
        <div class="logo">
            Logo
        </div>
        <nav>
            <ul class="nav-list">
                <li class="nav-category">Category</li>
                <li class="nav-item">
                    <router-link to="/">
                        <i class="fa fa-home nav-icon"></i>Home Page
                    </router-link>
                </li>
                <li class="nav-item nav-group nav-open">
                    <a href="javascript:;"><i class="fa fa-user nav-icon"></i>Nav Group</a>
                    <ul class="nav-sub-list">
                        <li class="nav-item">
                            <router-link to="/user">Sub Item</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/user?type=parent">Sub Item</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-category">Component</li>
                <li class="nav-item">
                    <router-link to="/component">
                       <i class="fa fa-area-chart nav-icon"></i> Component
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
    export default {

    }
</script>