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
                            <el-input placeholder="Please Input a Title" class="input" v-model="title">
                                <template slot="prepend">Title</template>
                            </el-input>
                        </el-col>
                        <el-col :md="6">
                            <el-input class="input" v-model="owner" disabled>
                                <template slot="prepend">User ID</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :sm="24" :md="12">
                            <el-input class="input" type="number" placeholder="Quantity" v-model="number" maxlength="4">
                                <template slot="prepend">Quantity</template>
                            </el-input>
                        </el-col>
                        <el-col :sm="24" :md="12">
                            <el-input class="input" type="number" placeholder="Price" v-model="price" maxlength="6">
                                <template slot="prepend">$</template>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-input type="textarea" autosize class="input" placeholder="Please Input Description" v-model="description" maxlength="200" show-word-limit>
                    </el-input>
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
    export default class EditPost extends Vue{
        successMessage = "";
        successShow = false;
        title = "";
        description = "";
        price = "";
        number = "";
        owner = "";
        isLoading = true;
        alertShow = false;
        alertTitle = "";
        @Prop(String) id?: string;
        created(){
            axios({
                url:`${process.env.VUE_APP_HOST}:8000/api/post?id=`+this.id,
                method:"post",
            }).then((response)=>{
                if(response.data.data.ownerid){
                    this.description = response.data.data.postBody;
                    this.title = response.data.data.postTitle;
                    this.price = response.data.data.price;
                    this.owner = response.data.data.ownerid;
                    this.number = response.data.data.quantity;
                    this.isLoading = false;
                }else{
                    throw "Failed to fetch data of this post";
                }
            }).catch((e)=>{
                this.alertTitle = "Failed to fetch data of this post";
                this.alertShow = true;
                this.isLoading = false;
            });
        }

        handleSave(){
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/admin/post/edit`,
                method:"post",
                data:{
                    id: this.id,
                    title: this.title,
                    number: this.number,
                    price: this.price,
                    token: UserModule.userInfo.token,
                    description: this.description,
                }
            }).then((response)=>{
                if(!response.data.error){
                    this.successMessage = "Successfully updated the information in this post!";
                    this.successShow = true;
                    this.alertShow = false;
                }
            }).catch((e)=>{
                console.log("Failed");
                this.alertTitle = e.response.data.error;
                this.alertShow = true;
                this.successShow = false;
            });
        }
        handleCloseAlertMessage(){
            this.alertShow = false;
        }
        handleCloseSuccessMessage(){
            this.successShow = false;
        }
        mounted(){
            if(window.history && window.history.pushState){
                history.pushState("", "", document.URL);
                window.addEventListener("popstate", ()=>{
                    history.pushState("", "", document.URL);
                    this.$router.push("/");
                }, false);
            }
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
