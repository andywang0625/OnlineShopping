<template>
        <el-container>
        <el-main>
        <el-row class="root" type="flex" align="middle">
            <el-col>
                <el-row type="flex" justify="center">
                    <el-col :xs="24" :sm="8" :xl="4"><el-input class="login-input" placeholder="User Name" v-model="username" prefix-icon="el-icon-user"></el-input></el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :xs="24" :sm="8" :xl="4"><el-input class="login-input" placeholder="Password" v-model="password" @change="handlePasswordChange" show-password prefix-icon="el-icon-lock"></el-input></el-col>
                </el-row>
                <el-row type="flex"  justify="center">
                    <el-col :xs="24" :sm="8" :xl="4">
                        <el-alert
                            class="login-input"
                            v-show="showError"
                            :title="errorMessage"
                            type="error"></el-alert>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :xs="24" :sm="8" :xl="4">
                        <el-button @click="handleSubmit" style="width:100%;">Login</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        </el-main>
        </el-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import axios from "axios";

    @Component
    export default class Login extends Vue {
        username = "";
        password = "";
        showError = false;
        errorMessage = "";
        handlePasswordChange(){
            if(this.password==""){
                this.errorMessage="Password Cannot be Empty"
                this.showError=true;
            }
        }
        created(){
            //console.log("Login", "Created");
        }
        handleSubmit(){
            if(this.password){
                axios({
                    url:`${process.env.VUE_APP_HOST}:8000/api/admin/login`,
                    method:"post",
                    data:{
                        name:this.username,
                        password:this.password,
                    }
                }).then((response)=>{
                    if(!response.data.error&&response.data.token){
                        this.$cookies.config({expires:"1d"});
                        this.$cookies.set('admin-token', response.data.token);
                        window.location.href = "/";
                    }
                    else{
                        console.log("Please contact website admin");
                        this.errorMessage = "Please contact website admin";
                        this.showError = true;
                    }
                }).catch((e)=>{
                    this.errorMessage = e.response.data.error;
                    this.showError = true;
                });
            }
        }
    }
</script>

<style scoped>
    .root{
        height:50vh;
    }
    .login-input{
        margin-bottom:10px;
    }
</style>
