<template>
    <div class="sidebar">
        <base-button type="button" @click="logout" color="dark-orange">
            Logout
        </base-button>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'sidebar',

        computed: {
            ...mapGetters(['profile']),
        },

        methods: {
            ...mapActions(['logout']),
        },
    };
</script>

<style lang="scss" scoped>
    .sidebar {
        padding: 30px 0 30px;
    }
</style>
