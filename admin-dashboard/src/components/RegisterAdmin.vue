<!--
 * @Author: Kanade
 * @Date: 2020-05-16 07:35:58
 * @LastEditTime: 2020-05-16 08:07:30
 * @Description:
-->
<template>
    <div v-loading="isLoading" class="root">
        <el-alert
            @close="handleCloseAlertMessage"
            :title="alertTitle"
            type="error"
            v-show="alertShow"
            class="alert">
        </el-alert>
        <el-alert
            @close="handleCloseSuccessMessage"
            :title="successMessage"
            type="success"
            effect="dark"
            v-show="successShow"
            class="alert"></el-alert>
        <el-row>
            <el-col :sm="24" :md="24">
                <el-card class="root-card" v-if="!isLoading">
                    <div class="title">Register New Admin Users</div>
                    <el-divider></el-divider>
                    <el-row :gutter="20">
                        <el-col :md="12">
                            <el-input placeholder="Please Input a Name" class="input" v-model="Name">
                                <template slot="prepend">User Name</template>
                            </el-input>
                        </el-col>
                        <el-col :md="12">
                            <el-input type="input" class="input" placeholder="Please Input an Email Address" v-model="Email" maxlength="200" show-word-limit>
                                <template slot="prepend">Email</template>
                            </el-input>
                        </el-col>
                        <el-col :md="6">
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :sm="24" :md="12">
                            <el-input class="input" type="password" show-password placeholder="User Password" v-model="password">
                                <template slot="prepend">Password</template>
                            </el-input>
                        </el-col>
                        <el-col :sm="24" :md="12">
                            <el-input class="input" type="password" show-password placeholder="Repeat the password" v-model="passwordRepeat">
                                <template slot="prepend">Repeat Password</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row justify="end" type="flex">
                        <el-col :sm="24" :md="3">
                            <el-button @click="handleSave" class="button" type="primary">Save</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
// eslint-disable-next-line
    import {Component, Vue, Prop, Watch} from "vue-property-decorator";
    // eslint-disable-next-line
    import axios from "axios";
    import {UserModule} from "@/store/module/user.ts";


    @Component
    export default class RegisterAdmin extends Vue{
        successMessage = "";
        successShow = false;
        Name = "";
        Email = "";
        password = "";
        passwordRepeat = "";
        isLoading = false;
        alertShow = false;
        alertTitle = "";
        @Prop(String) token?: string;

        handleSave(){
            if(!this.password){
                this.alertTitle = "Password cannot be empty.";
                this.alertShow = true;
                this.successShow = false;
            }
            else if(this.password!=this.passwordRepeat){
                this.alertTitle = "Please make sure the passwords match.";
                this.alertShow = true;
                this.successShow = false;
            }else
                axios({
                    url: `${process.env.VUE_APP_HOST}:8000/api/admin/register`,
                    method: "post",
                    data:{
                        token: UserModule.userInfo.token,
                        name: this.Name,
                        email: this.Email,
                        password: this.password,
                    }
                }).then((response)=>{
                    if(!response.data.error){
                        this.alertShow = false;
                        this.successMessage = "Successfully updated the information for this admin user!"
                        this.$emit('created');
                        this.Name = "";
                        this.Email = "";
                        this.password = "";
                        this.passwordRepeat = "";
                        this.successShow = true;
                    }
                }).catch((e)=>{
                    this.successShow = false;
                    this.alertTitle = e.response.data.error;
                    this.alertShow = true;
                });
        }
        handleCloseAlertMessage(){
            this.alertShow = false;
        }
        handleCloseSuccessMessage(){
            this.successShow = false;
        }
    }
</script>

<style scoped>
    .root-card{
        width:100%;
    }
    .input{
        margin-bottom: 10px;
    }
    .alert{
        margin-bottom: 20px;
    }
    .button{
        width:100%;
    }
    .root{
        width:100%;
    }
    .title{
        font-family:'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
    }
</style>
