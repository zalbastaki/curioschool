<template>
    <dashboard>
        <div class="student-class">
            <base-text type="h3">
                This is the student's {{ clas.name }} class page
            </base-text>
        </div>
    </dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Dashboard from '../../components/Dashboard';

    export default {
        name: 'student-class',

        components: {
            Dashboard,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        computed: {
            ...mapGetters(['classes']),

            clas() {
                return this.classes.find(({ id }) => {
                    return id === this.id;
                });
            },
        },
    };
</script>

<style lang="scss" scoped></style>
