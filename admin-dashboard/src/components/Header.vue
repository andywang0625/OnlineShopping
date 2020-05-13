<template>
    <el-row class="header" v-if="isLogin">
        <el-col :span="12">Admin Dashboard</el-col>
        <el-col :span="12"><div class="greetings" style="text-align:right;margin-right:10px;">Hi, {{this.name}}! <router-link to="/logout">Logout</router-link></div></el-col>
    </el-row>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import {UserModule} from "@/store/module/user.ts";

    @Component
    export default class Header extends Vue{
        private name?: string = "";
        private isLogin = false;
        created(){
            this.isLogin = UserModule.isLogin;
            this.name = UserModule.userInfo.name;
        }
    }
</script>

<style scoped>
    .header{
        font-family:'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
        font-size:20px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        width:100%;
        height:100%;
        display: flex;
        display: -webkit-flex;
        align-items:center;
        padding-left:10px;
    }
    .greetings{
        font-size:15px;
    }
</style>
