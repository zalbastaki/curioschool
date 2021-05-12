<template>
    <base-dashboard color="yellow">
        <base-loader :show="!adminClasses" />
        <div v-if="adminClasses" class="admin-classes">
            <base-text type="h3">Classes</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'admin-classes',

        computed: {
            ...mapGetters(['adminClasses']),
        },
    };
</script>

<style lang="scss" scoped></style>
