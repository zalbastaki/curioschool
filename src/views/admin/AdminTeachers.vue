<template>
    <base-dashboard color="yellow">
        <base-loader :show="!adminTeachers" />
        <div v-if="adminTeachers" class="admin-teachers">
            <base-text type="h3">Teachers</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'admin-teachers',

        computed: {
            ...mapGetters(['adminTeachers']),
        },
    };
</script>

<style lang="scss" scoped></style>
