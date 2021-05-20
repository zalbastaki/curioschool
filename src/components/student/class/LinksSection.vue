<template>
    <section class="links">
        <base-card
            v-for="(link, index) in links"
            :key="index"
            class="link"
            :class="$mq"
            :to="{ path: link.path }"
            :background="`${color}44`"
            :border="color"
        >
            <fa-icon class="icon" :icon="link.icon" :aria-label="link.label" />
            <base-text type="h5">{{ link.label }}</base-text>
        </base-card>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'links-section',

        computed: {
            ...mapGetters(['currentClass']),

            id() {
                return this.currentClass.id;
            },

            color() {
                return this.currentClass.color;
            },

            links() {
                return [
                    {
                        label: 'homework',
                        icon: ['fas', 'home'],
                        path: `/student-assessments/${this.id}/homework`,
                    },
                    {
                        label: 'classwork',
                        icon: ['fas', 'chalkboard-teacher'],
                        path: `/student-assessments/${this.id}/classwork`,
                    },
                    {
                        label: 'projects',
                        icon: ['fas', 'project-diagram'],
                        path: `/student-assessments/${this.id}/projects`,
                    },
                    {
                        label: 'quizzes',
                        icon: ['fas', 'sticky-note'],
                        path: `/student-assessments/${this.id}/quizzes`,
                    },
                    {
                        label: 'tests',
                        icon: ['fas', 'file-alt'],
                        path: `/student-assessments/${this.id}/tests`,
                    },
                ];
            },
        },
    };
</script>

<style lang="scss" scoped>
    .links {
        overflow: scroll;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: repeat(5, 1fr);
        grid-auto-flow: row;
        text-align: center;
        text-transform: capitalize;

        .link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            padding: 15px;

            &.tablet {
                margin-bottom: 5px;
            }

            .icon {
                font-size: 40px;
                margin: 5px 0 10px;
                color: $black;
            }

            .h5 {
                &.tablet {
                    font-size: 16px;
                }
            }
        }
    }
</style>
