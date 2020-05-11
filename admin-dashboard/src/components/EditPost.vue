<template>
    <div>

    </div>
</template>

<script>
    import {Component, Vue, Prop, Watch} from "vue-property-decorator";
    import axios from "axios";
    export default class EditPost extends Vue{
        title?: string;
        description?: string;
        price?: string;
        number?: string;
        @Prop(String) token?: string;
        @Prop(String) postid?: string;

    }
</script>

<style scoped>

</style>
