<template>
    <base-dashboard color="yellow">
        <base-loader :show="!adminStudents" />
        <div v-if="adminStudents" class="admin-students">
            <base-text type="h3">Students</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'admin-students',

        computed: {
            ...mapGetters(['adminStudents']),
        },
    };
</script>

<style lang="scss" scoped></style>
