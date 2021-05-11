<template>
    <base-dashboard>
        <base-loader :show="!currentClass" />
        <div v-if="currentClass" class="student-assessments">
            <router-link
                class="back-btn"
                :to="`/student-class/${id}`"
                :style="{
                    background: `${currentClass.color}44`,
                    borderColor: currentClass.color,
                }"
            >
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </router-link>
            <base-text type="h1">{{ currentClass.name }} {{ type }}</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'student-assessments',

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
            ...mapGetters(['currentClass']),
        },

        created() {
            this.updateCurrentClass();
        },

        methods: {
            ...mapActions(['updateCurrentClass']),
        },
    };
</script>

<style lang="scss" scoped>
    .student-assessments {
        .back-btn {
            color: $black;
            font-size: 30px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border-width: 3px;
            border-style: solid;
            margin-bottom: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            &:hover {
                margin-left: -3px;
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
