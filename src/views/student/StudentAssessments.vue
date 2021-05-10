<template>
    <dashboard>
        <base-loader :show="!clas" />
        <div v-if="clas" class="student-assessments">
            <router-link class="back-btn" :to="`/student-class/${id}`">
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </router-link>
            <base-text type="h1">{{ clas.name }} {{ type }}</base-text>
        </div>
    </dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Dashboard from '../../components/Dashboard';

    export default {
        name: 'student-assessments',

        components: {
            Dashboard,
        },

        props: {
            id: {
                type: String,
                required: true,
            },

            type: {
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

<style lang="scss" scoped>
    .student-assessments {
        .back-btn {
            background: $yellow;
            color: $black;
            font-size: 30px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-bottom: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background: darken($yellow, 5%);
            }
        }

        .h1 {
            font-size: 50px;
            text-transform: capitalize;

            &.tablet {
                font-size: 45px;
            }
        }
    }
</style>
