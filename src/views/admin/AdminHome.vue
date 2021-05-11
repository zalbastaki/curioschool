<template>
    <div class="admin-home">
        <base-text type="h3">This is the admin homepage</base-text>

        <base-button class="logout-btn" type="button" @click="logout">
            Logout
        </base-button>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'admin-home',

        computed: {
            ...mapGetters(['adminUsers']),
        },

        methods: {
            ...mapActions(['logout']),
        },
    };
</script>

<style lang="scss" scoped></style>
