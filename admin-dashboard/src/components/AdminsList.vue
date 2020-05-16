<!--
 * @Author: Kanade
 * @Date: 2020-05-16 06:12:49
 * @LastEditTime: 2020-05-16 08:23:49
 * @Description:
-->
<template>
    <div v-loading="isLoading">
        <RegisterAdmin @created="handleRefetch" token="token"></RegisterAdmin>
        <el-alert
            class="dashboard-message"
            v-show="showError"
            :title="errorMessage"
            type="error"></el-alert>
        <el-table
            :data="admins.filter(data=> !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            border
            style="width: 100%">
            <el-table-column
            prop="id"
            label="ID"
            sortable
            width="40">
            </el-table-column>
            <el-table-column
                prop="name"
                label="Admin Name"
                width="250">
            </el-table-column>
            <el-table-column
            prop="email"
            label="Admin Email"
            width="400">
            </el-table-column>
            <el-table-column
                fixed="left"
                width="200">
                <!-- eslint-disable-next-line -->
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="Search"></el-input>
                </template>
                <!-- eslint-disable-next-line -->
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" class="button" size="small">Edit</el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" class="button" size="small" type="danger">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {UserModule} from "@/store/module/user.ts";
    import RegisterAdmin from "@/components/RegisterAdmin.vue";
    import axios from "axios";

    @Component({
        components:{
            RegisterAdmin,
        }
    })
    export default class AdminsList extends Vue {
        admins = [];
        isLoading = true;
        showError = false;
        errorMessage = "";
        search = "";
        cancel: any;
        handleDelete(index: number, row: any){
            this.$confirm('It will remove this admin user permanently, are you sure you want to continue?', 'Alert', {
                confirmButtonText: "Sure",
                cancelButtonText: "Nope, I don't mean that",
                type: "warning",
            }).then(()=>{
                axios({
                    url: `${process.env.VUE_APP_HOST}:8000/api/admin/delete`,
                    method: 'post',
                    data:{
                        token: UserModule.userInfo.token,
                        id: row.id,
                    }
                }).then((response)=>{
                    this.$message({
                        type: 'success',
                        message: "The Admin User has Been Deleted."
                    });
                    this.handleRefetch();
                }).catch((e)=>{
                    this.$message.error("An error occurred while deleting the admin user.");
                });
            }).catch(()=>{
                this.$message({
                    type: "info",
                    message: "Action Canceled"
                });
            });
        }

        handleEdit(index: number, row: any){
            this.$router.push("/editadmin/"+row.id);
        }
        @Watch("search")
        created(){
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/admins`,
                method: 'get',
                params:{
                    token: UserModule.userInfo.token,
                }
            }).then((response)=>{
                this.admins = response.data;
                this.isLoading = false;
            }).catch((e)=>{
                this.errorMessage = e.response;
                this.showError = true;
            });
        }

        handleRefetch(){
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/admins`,
                method: 'get',
                params:{
                    token: UserModule.userInfo.token,
                }
            }).then((response)=>{
                this.admins = response.data;
                this.isLoading = false;
            }).catch((e)=>{
                this.errorMessage = e.response.data.error;
                this.showError = true;
            });
        }
    }
</script>

<style scoped>
    .cards{
        margin-bottom: 10px;
    }
    .button-panel{
        text-align:right;
    }
    .list {
    max-height: 200px;
    }
    .button{
        margin-left: 0;
        margin-right: 10px;
        margin-bottom: 5px;
    }
</style>
