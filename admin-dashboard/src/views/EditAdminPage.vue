<!--
 * @Author: Kanade
 * @Date: 2020-05-16 06:13:20
 * @LastEditTime: 2020-05-16 07:54:55
 * @Description:
-->
<template>
        <el-container>
        <el-header>
        <Header></Header>
        </el-header>
        <el-main>
            <EditAdmin :id="id"></EditAdmin>
        </el-main>
        </el-container>
</template>

<script>
    import {Component, Vue, Prop, Watch} from "vue-property-decorator";
    import EditAdmin from "@/components/EditAdmin.vue";
    import Header from '@/components/Header.vue';


    @Component({
        components:{
            EditAdmin,
            Header,
        }
    })
    export default class EditAdminPage extends Vue{
        @Prop(String) id;
    }
</script>

<style scoped>

</style>
