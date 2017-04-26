<template>
    <header class="navbar navbar-toggleable top-header">
        <div class="navbar-brand">
            <i class="fa fa-codepen"></i>
            <span>Mancy Manager</span>
        </div>
        <div class="navbar-nav align-items-center f1 justify-content-between flex-row">
            <div class="drawer">
                <span class="handle" @click="toggle"><i class="icon fa fa-bars"></i></span>
            </div>
            <div class="top-nav">
                <ul class="nav nav-inline">
                    <li class="nav-item" v-dropdown-action>
                        <a href class="nav-link" dropdown-action>Admin <i class="fa fa-angle-down"></i></a>
                        <div class="dropdown-menu dropdown-menu-right" dropdown-content>
                            <a class="dropdown-item" href="javascript:;" dismiss>登出</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'HeaderView',
        methods: {
            toggle(){
                this.$emit('toggle-nav');
            }
        }
    }
</script>