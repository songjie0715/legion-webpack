<template>
    <div>
        <div class="login-frame">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title m-b-0">欢迎来到Mancy</h5>
                </div>
                <div class="card-block">
                    <div class="form-group">
                        <input type="text" ref="name" placeholder="用户名" v-model="fd.userName" v-focus class="form-control">
                    </div>
                    <div class="form-group m-b-0">
                        <input type="password" ref="pass" placeholder="密码" v-model="fd.password" @keyup.enter="login" class="form-control">
                    </div>
                    <div class="alert alert-danger m-t-1 m-b-0" v-show="status == REQUEST_STATUS.REJECTED">
                        用户名或密码错误
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-main btn-block" :disabled="isPending" @click="login" v-text="btnText"></button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapActions } from 'vuex';
    import {USER_ROLE} from '../../../const/Enum';
    import {go} from 'helper.js';
    import {REQUEST_STATUS} from '../../../const';

    export default {
        name: 'LoginView',
        computed: {
            btnText(){
                if(this.status == REQUEST_STATUS.PENDING){
                    return '登录中..'
                }
                if(this.status = REQUEST_STATUS.RESOLVED){
                    return '登录成功'
                }
                return '登录'
            },
            isPending(){
                return this.status == REQUEST_STATUS.PENDING;
            }
        },
        data(){
            return {
                REQUEST_STATUS,
                status: REQUEST_STATUS.UNSENT,
                fd: {
                    userName: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions(['storeUser']),
            validate(){
                if (!this.fd.userName.trim()) {
                    this.$refs.name.focus();
                    return false;
                }
                if (!this.fd.password.trim()) {
                    this.$refs.pass.focus();
                    return false;
                }
                return true;
            },
            login(){
                if(!this.validate()) return;

                this.status = REQUEST_STATUS.PENDING;

                UserService.login(this.fd.userName, this.fd.password).then(user=>{
                    this.status = REQUEST_STATUS.RESOLVED;
                    let redirectTo = this.$route.query.redirect || '/';

                    if(user.role == USER_ROLE.ADMIN){
                        go('/manage/')
                    } else{
                        this.$router.app.login(user).then(()=>{
                            this.$router.replace(redirectTo);
                        })
                    }
                }, err=>{
                    this.status = REQUEST_STATUS.REJECTED;
                })
            }
        }
    }
</script>