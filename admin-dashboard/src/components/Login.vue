<template>
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
                            title="Password Cannot be Empty"
                            type="error"></el-alert>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :xs="24" :sm="8" :xl="4">
                        <el-button style="width:100%;">Login</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        </el-main>
</template>

<script>
    export default {
        name:"Login",
        data:()=>{
            return {
                username: "",
                password: "",
                showError: false,
            };
        },
        methods:{
            handlePasswordChange: function(){
                if(this.password==""){
                    this.showError=true;
                }
            },
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