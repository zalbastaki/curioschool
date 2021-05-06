<template>
    <dashboard>
        <div class="student-settings">
            <base-text type="h3">This is the student settings page</base-text>
        </div>
    </dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Dashboard from '../../components/Dashboard';

    export default {
        name: 'student-settings',

        components: {
            Dashboard,
        },

        computed: {
            ...mapGetters(['profile']),
        },
    };
</script>

<style lang="scss" scoped></style>
