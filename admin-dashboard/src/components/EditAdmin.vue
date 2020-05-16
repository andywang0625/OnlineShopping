<template>
    <div v-loading="isLoading">
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
            <el-col :sm="24" :md="18">
                <el-card class="root-card" v-if="!isLoading">
                    <el-row :gutter="20">
                        <el-col :md="18">
                            <el-input placeholder="Please Input a Name" class="input" v-model="Name">
                                <template slot="prepend">User Name</template>
                            </el-input>
                        </el-col>
                        <el-col :md="6">
                            <el-input class="input" v-model="userId" disabled>
                                <template slot="prepend">User ID</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-input type="input" class="input" placeholder="Please Input an Email Address" v-model="Email" maxlength="200" show-word-limit>
                        <template slot="prepend">Email</template>
                    </el-input>
                    <el-row :gutter="20">
                        <el-col :sm="24" :md="12">
                            <el-input class="input" type="password" show-password placeholder="Unchanged" v-model="password">
                                <template slot="prepend">Password</template>
                            </el-input>
                        </el-col>
                        <el-col :sm="24" :md="12">
                            <el-input class="input" type="password" show-password placeholder="Repeat the new password" v-model="passwordRepeat">
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
    export default class EditUser extends Vue{
        successMessage = "";
        successShow = false;
        Name = "";
        Email = "";
        userId = "";
        password = "";
        passwordRepeat = "";
        isLoading = true;
        alertShow = false;
        alertTitle = "";
        @Prop(String) id?: string;
        created(){
            axios({
                url:`${process.env.VUE_APP_HOST}:8000/api/admin/get`,
                method:"get",
                params:{
                    token: UserModule.userInfo.token,
                    id: this.id,
                }
            }).then((response)=>{
                this.Name = response.data.name;
                this.Email = response.data.email;
                this.userId = response.data.id;
                this.isLoading = false;
            }).catch((e)=>{
                this.alertTitle = "Failed to fetch the information of this admin user";
                this.alertShow = true;
                this.isLoading = false;
            });
        }

        mounted(){
            if(window.history && window.history.pushState){
                history.pushState("", "", document.URL);
                window.addEventListener("popstate", ()=>{
                    history.pushState("", "", document.URL);
                    this.$router.push({name: 'Home', query:{page:"admins"}});
                }, false);
            }
        }

        handleSave(){
            if(this.password!=this.passwordRepeat){
                this.alertTitle = "Please make sure the passwords match.";
                this.alertShow = true;
                this.successShow = false;
            }else
                axios({
                    url: `${process.env.VUE_APP_HOST}:8000/api/admin/edit`,
                    method: "post",
                    data:{
                        token: UserModule.userInfo.token,
                        id: this.id,
                        name: this.Name,
                        email: this.Email,
                        password: this.password,
                    }
                }).then((response)=>{
                    if(!response.data.error){
                        this.alertShow = false;
                        this.successMessage = "Successfully updated the information for this admin user!"
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
</style>
