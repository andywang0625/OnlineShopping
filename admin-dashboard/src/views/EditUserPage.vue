<template>
        <el-container>
        <el-header>
        <Header></Header>
        </el-header>
        <el-main>
            <EditUser :id="id"></EditUser>
        </el-main>
        </el-container>
</template>

<script>
    import {Component, Vue, Prop, Watch} from "vue-property-decorator";
    import EditUser from "@/components/EditUser.vue";
    import Header from '@/components/Header.vue';


    @Component({
        components:{
            EditUser,
            Header,
        }
    })
    export default class EditPostPage extends Vue{
        @Prop(String) id;
    }
</script>

<style scoped>

</style>
