<template>
    <div v-loading="isLoading">
        <el-alert
            class="dashboard-message"
            v-show="showError"
            :title="errorMessage"
            type="error"></el-alert>
        <el-table
            :data="posts"
            border
            style="width: 100%">
            <el-table-column
            prop="id"
            label="ID"
            sortable
            width="40">
            </el-table-column>
            <el-table-column
            prop="title"
            label="Title"
            sortable
            width="150">
            </el-table-column>
            <el-table-column
            prop="userid"
            label="User"
            sortable
            width="100">
            </el-table-column>
            <el-table-column
            prop="price"
            label="Price"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="number"
            label="#Left"
            width="60">
            </el-table-column>
            <el-table-column
            prop="created_at"
            label="Created At"
            sortable
            width="150">
            </el-table-column>
            <el-table-column
            prop="description"
            label="Description"
            width="1000"></el-table-column>
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
    import axios from "axios";

    @Component
    export default class PostList extends Vue {
        posts = [];
        isLoading = true;
        showError = false;
        errorMessage = "";
        search = "";
        cancel: any;
        handleEdit(index: number, row: any){
            this.$router.push("/edit/"+row.id);
        }
        @Watch("search")
        handleSearchChange(){
            if(this.cancel)
                this.cancel.cancel();
            this.cancel = axios.CancelToken.source();
            this.isLoading = true;
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/posts`,
                method: 'post',
                data:{
                    keyWord:this.search,
                },
                cancelToken: this.cancel.token,
            }).then((response)=>{
                this.posts = response.data;
                this.isLoading = false;
                this.showError = false;
            }).catch((e)=>{
                this.errorMessage = e.response;
                this.showError = true;
            })
        }
        created(){
            axios({
                url: `${process.env.VUE_APP_HOST}:8000/api/posts`,
                method: 'post',
            }).then((response)=>{
                this.posts = response.data;
                this.isLoading = false;
            }).catch((e)=>{
                this.errorMessage = e.response;
                this.showError = true;
            })
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
