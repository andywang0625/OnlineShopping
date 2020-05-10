<template>
    <el-main>
        <el-tabs tab-position="right" v-model="activeTab" @tab-click="handleSelect" style="overflow: hidden;">
            <el-tab-pane name="1" label="Posts"><PostList></PostList></el-tab-pane>
            <el-tab-pane name="2" label="Users">Users</el-tab-pane>
            <el-tab-pane name="3" label="Admins">Admins</el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import PostList from "./PostsList.vue";

    @Component({
        components:{
            PostList,
        }
    })
    export default class Home extends Vue{
        @Prop(String) token?: string;

        private activeTab = "1";

        handleSelect(key: string, keyPath: string){
            //
        }

        created(){
            //
        }
    }
</script>

<style scoped>

</style>
