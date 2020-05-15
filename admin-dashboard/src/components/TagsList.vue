<template>
    <div v-loading="isLoading">
        <el-alert
            class="dashboard-message"
            v-show="showError"
            :title="errorMessage"
            type="error"></el-alert>
        <el-alert
            class="dashboard-message"
            v-show="showSuccess"
            :title="successMessage"
            type="success"
            effect="dark"></el-alert>
        <el-card class="box-card">
            <el-row :gutter="10">
                <el-col :sm="24" :lg="4">
                    <el-input placeholder="Tag Name" v-model="tagName" maxlength="50" show-word-limit></el-input>
                </el-col>
                <el-col :sm="24" :lg="18">
                    <el-input placeholder="Tag Description" v-model="tagDescription" maxlength="400" show-word-limit></el-input>
                </el-col>
                <el-col :sm="24" :lg="2">
                    <el-button style="width:100%;" @click="handleSave" type="primary">Create</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-table
            :data="tags.filter(data=> !search||data.tag.toLowerCase().includes(search.toLowerCase()))"
            border
            style="width:100%">
            <el-table-column
                prop="tag"
                label="tag"
                sortable
                width="200">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{scope.row.tag}}</el-tag>
                    </template>
                </el-table-column>
            <el-table-column
                prop="description"
                label="Description"
                sortable
                width="500"></el-table-column>
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
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" size="small">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import axios from "axios";
    import {UserModule} from "@/store/module/user.ts";

    @Component
    export default class TagsList extends Vue{
        tagName = "";
        tagDescription = "";
        tags: Array<any> = [];
        isLoading = true;
        showError = false;
        errorMessage = "";
        search = "";
        showSuccess = false;
        successMessage = "";

        handleRefetch(){
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/tags`,
                method: "get",
            }).then((response)=>{
                this.tags = response.data.tags;
                this.isLoading = false;
            }).catch((e)=>{
                this.errorMessage = "Failed to fetch avaliable tags.";
                this.isLoading = false;
                this.showError = true;
            });
        }

        handleSave(){
            this.isLoading = true;
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/admin/tag/create`,
                method: "post",
                data:{
                    token: UserModule.userInfo.token,
                    tag: this.tagName,
                    description: this.tagDescription,
                }
            }).then((response)=>{
                this.handleRefetch();
                this.successMessage = "The new tag successfully created!";
                this.showSuccess = true;
                this.isLoading = false;
            }).catch((e)=>{
                this.errorMessage = e.response.data.error;
                this.showSuccess = false;
                this.isLoading = false;
                this.showError = true;
            });
        }

        handleDelete(index: number, row: any){
            this.isLoading = true;
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/admin/tag/delete`,
                method: "post",
                data:{
                    token: UserModule.userInfo.token,
                    id: row.id,
                }
            }).then((response)=>{
                this.tags = this.tags.filter(currentValue => currentValue.id!=row.id);
                this.isLoading = false;
            }).catch((e)=>{
                this.errorMessage = "Failed to fetch avaliable tags.";
                this.showSuccess = false;
                this.isLoading = false;
                this.showError = true;
            });
        }
        created(){
            this.handleRefetch()
        }
    }
</script>

<style scoped>

</style>
