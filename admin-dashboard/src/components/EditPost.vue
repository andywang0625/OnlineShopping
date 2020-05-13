<template>
    <div>{{id}}</div>
</template>

<script lang="ts">
// eslint-disable-next-line
    import {Component, Vue, Prop, Watch} from "vue-property-decorator";
    // eslint-disable-next-line
    import axios from "axios";


    @Component
    export default class EditPost extends Vue{
        title?: string;
        description?: string;
        price?: string;
        number?: string;
        @Prop(String) id?: string;
    }
</script>

<style scoped>

</style>
