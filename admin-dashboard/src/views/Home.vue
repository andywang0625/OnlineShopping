<template>
    <HomeComponent></HomeComponent>
</template>

<script lang="ts">
import HomeComponent from '@/components/Home.vue';
import {Component, Vue, Prop} from "vue-property-decorator";

@Component({
    components:{
        HomeComponent,
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
