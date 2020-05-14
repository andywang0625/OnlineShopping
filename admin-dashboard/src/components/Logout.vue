<template>
    <div>

    </div>
</template>

<script>
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Logout extends Vue {
        created(){
            this.$cookies.remove("admin-token");
            window.location.href = "/";
        }
    }
</script>

<style scoped>

</style>
