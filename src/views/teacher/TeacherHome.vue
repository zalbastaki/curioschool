<template>
    <dashboard>
        <div class="teacher-home">
            <base-text type="h3">This is the teacher homepage</base-text>
        </div>
    </dashboard>
</template>

<script>
    import Dashboard from '../../components/Dashboard';

    export default {
        name: 'teacher-home',

        components: {
            Dashboard,
        },
    };
</script>

<style lang="scss" scoped></style>
