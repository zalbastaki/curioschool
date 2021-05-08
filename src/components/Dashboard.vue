<template>
    <div class="dashboard" :class="$mq">
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

        .page-content {
            flex: 1;
            background: $white;
            margin-top: 80px;
            padding: 30px;
            border-top-left-radius: 50px;
        }

        &.tablet {
            .page-content {
                margin-top: 40px;
            }
        }
    }
</style>
