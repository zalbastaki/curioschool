<template>
    <base-dashboard>
        <base-loader :show="!clas" />
        <div v-if="clas" class="student-assessments">
            <router-link
                class="back-btn"
                :to="`/student-class/${id}`"
                :style="{
                    background: `${clas.color}44`,
                    borderColor: clas.color,
                }"
            >
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </router-link>
            <base-text type="h1">{{ clas.name }} {{ type }}</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';

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
