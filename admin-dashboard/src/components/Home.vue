<!--
 * @Author: Kanade
 * @Date: 2020-05-15 01:00:22
 * @LastEditTime: 2020-05-16 06:20:33
 * @Description:
-->
<template>
    <el-main>
        <el-tabs tab-position="right" v-model="activeTab" @tab-click="handleSelect" style="overflow: hidden;">
            <el-tab-pane name="1" label="Posts"><PostList></PostList></el-tab-pane>
            <el-tab-pane name="2" label="Users"><UsersList></UsersList></el-tab-pane>
            <el-tab-pane name="3" label="Tags"><TagsList></TagsList></el-tab-pane>
            <el-tab-pane name="4" label="Admins"><AdminList></AdminList></el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import PostList from "./PostsList.vue";
    import UsersList from "./UsersList.vue";
    import TagsList from "./TagsList.vue";
    import AdminList from "./AdminsList.vue";

    @Component({
        components:{
            PostList,
            UsersList,
            TagsList,
            AdminList,
        }
    })

    export default class Home extends Vue{
        private page: null|string = null;
        private activeTab: null|string = null;

        handleSelect(key: string, keyPath: string){
            //
        }

        created(){
            this.page = String(this.$route.query.page);
            if(this.page == "users")
                this.activeTab = "2";
            else if(this.page == "tags")
                this.activeTab = "3";
            else if(this.page == "admins")
                this.activeTab = "4";
            else
                this.activeTab = "1";
        }
    }
</script>

<style scoped>

</style>
