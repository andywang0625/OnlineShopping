<template>
    <el-page-header v-if="props.title" @back="goBack" content="Admin Dashboard Login"></el-page-header>
</template>

<script>
    export default {
        name:"LoginHeader",
        props: ['token'],
        created: function() {
        }
    }
</script>

<style scoped>

</style>