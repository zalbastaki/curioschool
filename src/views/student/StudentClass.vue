<template>
    <dashboard>
        <base-loader :show="!clas" />
        <div v-if="clas" class="student-class">
            <section class="top-bar">
                <div class="class-title">
                    <div class="teacher-img" />
                    <base-text type="h1">{{ clas.name }}</base-text>
                </div>
                <progress-section />
            </section>
            <section class="links">
                <dashboard-card
                    v-for="(link, index) in links"
                    :key="index"
                    class="link"
                    :to="{ path: link.path }"
                    :background="`${clas.color}44`"
                    :border="clas.color"
                >
                    <fa-icon
                        class="icon"
                        :icon="link.icon"
                        :aria-label="link.label"
                    />
                    <base-text type="h5">{{ link.label }}</base-text>
                </dashboard-card>
            </section>
        </div>
    </dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Dashboard from '../../components/Dashboard';
    import ProgressSection from '../../components/ProgressSection';
    import DashboardCard from '../../components/DashboardCard';

    export default {
        name: 'student-class',

        components: {
            Dashboard,
            ProgressSection,
            DashboardCard,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                links: [
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
                ],
            };
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
    .student-class {
        width: 100%;
        max-height: 100%;
        display: grid;
        grid-template-rows: auto 1fr 1fr;
        grid-template-columns:
            calc(15% - 20px) calc(30% - 20px) calc(25% - 20px)
            30%;
        gap: 20px;
        grid-template-areas:
            'top-bar top-bar top-bar top-bar'
            'links announcements leaderboard rewards'
            'links chat leaderboard rewards';

        .top-bar {
            grid-area: top-bar;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .class-title {
                display: flex;
                align-items: center;
            }

            .teacher-img {
                height: 60px;
                width: 60px;
                border-radius: 50%;
                background-image: url('../../assets/images/placeholder-avatar.png');
                background-size: cover;
                background-position: center;
                border: 3px solid $dark-purple;
                margin-right: 10px;
            }

            .h1 {
                font-size: 50px;
                text-transform: capitalize;
            }
        }

        .links {
            grid-area: links;
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
    }
</style>
