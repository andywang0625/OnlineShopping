<template>
  <div v-loading="isLoading" id="app">
    <el-container>
    <el-header>
        <Header v-show="showHeader" :name="name" :token="token"></Header>
    </el-header>
    <router-view :token="token" :adminEmail="email" :adminName="name" />
    </el-container>
  </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Header from '@/components/Header.vue';
    import axios from "axios";
    import {UserModule} from "@/store/module/user.ts";

    @Component({
        components:{
            Header,
        },
    })
    export default class App extends Vue{
        private showHeader = false;
        private isLoading = true;
        name = "";
        email = "";
        token: string|null|object = "";
        created(){
            if(this.$cookies.get("admin-token")){
                this.token = this.$cookies.get("admin-token");
                axios({
                    url:`${process.env.VUE_APP_HOST}:8000/api/admin/islogin`,
                    method: "POST",
                    data:{
                        token:this.token,
                    }
                }).then((response: any)=>{
                    if(!response.data.error){
                        console.log("app.vue request good",response.data);
                        this.name = response.data.name;
                        this.email = response.data.email;
                        //update user info
                        UserModule.updateToken(this.$cookies.get("admin-token"));
                        UserModule.updateName(response.data.name);
                        UserModule.updateEmail(response.data.email);
                        this.showHeader = true;
                        this.isLoading = false;
                        this.$router.push("/");
                    }
                }).catch(()=>{
                   this.showHeader = false;
                   this.isLoading = false;
                   window.location.href = "/logout";
                });
            }else{
                this.isLoading = false;
            }
        }
    }
</script>
