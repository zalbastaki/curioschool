<template>
    <dashboard>
        <div class="student-home">
            <base-text type="h3">This is the student homepage</base-text>
        </div>
    </dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Dashboard from '../../components/Dashboard';

    export default {
        name: 'student-home',

        components: {
            Dashboard,
        },

        computed: {
            ...mapGetters(['profile']),
        },
    };
</script>

<style lang="scss" scoped></style>
