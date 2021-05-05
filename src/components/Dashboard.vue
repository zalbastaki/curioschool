<template>
    <div class="dashboard">
        <sidebar />
        <div class="page-content">
            <slot />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Sidebar from './Sidebar';

    export default {
        name: 'dashboard',

        components: {
            Sidebar,
        },

        computed: {
            ...mapGetters(['role']),
        },
    };
</script>

<style lang="scss" scoped>
    .dashboard {
        display: flex;
        width: 100vw;
        height: 100vh;
        background: $purple;
    }
</style>
