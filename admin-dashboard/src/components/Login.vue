<template>
    <div>
        <el-row>
            <el-col :span="24"><el-input class="grid-content" placeholder="User Name" v-model="username"></el-input></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><el-input placeholder="Password" v-model="password" @change="handlePasswordChange" show-password></el-input></el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-alert
                    v-show="showError"
                    title="Password Cannot be Empty"
                    type="error"></el-alert>
            </el-col>
        </el-row>
    </div>
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

</style>