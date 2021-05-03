<template>
    <div id="app">
        <router-view />
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
    }
</style>
