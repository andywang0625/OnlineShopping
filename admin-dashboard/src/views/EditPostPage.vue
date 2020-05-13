<template>
        <el-container>
        <el-header>
        <Header></Header>
        </el-header>
        <el-main>
            <EditPost :id="id"></EditPost>
        </el-main>
        </el-container>
</template>

<script>
    import {Component, Vue, Prop, Watch} from "vue-property-decorator";
    import EditPost from "@/components/EditPost.vue";
    import Header from '@/components/Header.vue';


    @Component({
        components:{
            EditPost,
            Header,
        }
    })
    export default class EditPostPage extends Vue{
        @Prop(String) id;
    }
</script>

<style scoped>

</style>
