<template>
    <dashboard>
        <div class="student-home">
            <base-text type="h3">This is the student homepage</base-text>
            <base-button type="button" @click="logout">
                Logout
            </base-button>
        </div>
    </dashboard>
</template>

<script>
    import protectRoute from '../../mixins/protectRoute';
    import { mapActions } from 'vuex';
    import Dashboard from '../../components/Dashboard';

    export default {
        name: 'student-home',

        mixins: [protectRoute],

        components: {
            Dashboard,
        },

        methods: {
            ...mapActions(['logout']),
        },
    };
</script>

<style lang="scss" scoped></style>
