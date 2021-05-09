<template>
    <div id="app">
        <router-view :key="$route.fullPath" />
    </div>
</template>

<script>
    export default {
        name: 'default',
    };
</script>

<style lang="scss">
    body {
        margin: 0;
    }

    #app {
        font-family: $font-family;
        font-size: 16px;
        color: $black;
    }
</style>
