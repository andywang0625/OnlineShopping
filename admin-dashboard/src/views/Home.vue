<template>
    <el-container>
        <el-header>
        <Header></Header>
        </el-header>
        <el-main>
            <HomeComponent></HomeComponent>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import HomeComponent from '@/components/Home.vue';
import {Component, Vue, Prop} from "vue-property-decorator";
import Header from '@/components/Header.vue';

@Component({
    components:{
        HomeComponent,
        Header,
    },
})
export default class Home extends Vue {
    @Prop(String) token?: string;
    @Prop(String) adminName?: string;
    @Prop(String) adminEmail?: string;
    created(){
        // Props: this.token||!this.adminName||!this.adminEmail
    }
}
</script>
