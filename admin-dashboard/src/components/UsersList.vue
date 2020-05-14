<template>
    <div v-loading="isLoading">
        <el-alert
            class="dashboard-message"
            v-show="showError"
            :title="errorMessage"
            type="error"></el-alert>
        <el-table
            :data="users.filter(data=> !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
                label="User Name"
                width="100">
            </el-table-column>
            <el-table-column
            prop="email"
            label="Email"
            width="250">
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="Created At"
            sortable
            width="250">
            </el-table-column>
            <el-table-column
            prop="updated_at"
            label="Last Login At"
            sortable
            width="250">
            </el-table-column>
            <el-table-column
                fixed="left"
                width="150">
                <!-- eslint-disable-next-line -->
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="Search"></el-input>
                </template>
                <!-- eslint-disable-next-line -->
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {UserModule} from "@/store/module/user.ts";
    import axios from "axios";

    @Component
    export default class UsersList extends Vue {
        users = [];
        isLoading = true;
        showError = false;
        errorMessage = "";
        search = "";
        cancel: any;
        handleEdit(index: number, row: any){
            this.$router.push("/edituser/"+row.id);
        }
        @Watch("search")
        created(){
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/admin/users`,
                method: 'post',
                data:{
                    token: UserModule.userInfo.token,
                }
            }).then((response)=>{
                this.users = response.data;
                this.isLoading = false;
            }).catch((e)=>{
                this.errorMessage = e.response;
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
</style>
