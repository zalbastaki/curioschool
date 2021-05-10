<template>
    <base-dashboard>
        <div class="student-settings">
            <base-text type="h3">This is the student settings page</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'student-settings',

        computed: {
            ...mapGetters(['profile']),
        },
    };
</script>

<style lang="scss" scoped></style>
