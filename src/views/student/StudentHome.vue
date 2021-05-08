<template>
    <dashboard>
        <div class="student-home">
            <progress-section />
            <section class="greeting">
                <base-text type="h1">Hey {{ profile.first_name }}!</base-text>
            </section>
            <dashboard-section class="todo" heading="Today's plan">
                <!-- TO DO -->
                <base-text v-for="(num, index) in 20" :key="index" type="p"
                    >Test item</base-text
                >
            </dashboard-section>
            <dashboard-section class="upcoming" heading="Upcoming Assessments">
                <!-- TO DO -->
            </dashboard-section>
            <section class="schedule">
                <base-text type="h3">Schedule</base-text>
            </section>
            <section class="classes">
                <dashboard-card
                    v-for="(clas, index) in classes"
                    :key="index"
                    class="class-link"
                    :to="{ path: `/student-class/${clas.id}` }"
                    :hex-color="clas.color"
                >
                    <div class="teacher-img" />
                    <base-text type="h4">{{ clas.name }}</base-text>
                </dashboard-card>
            </section>
        </div>
    </dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Dashboard from '../../components/Dashboard';
    import ProgressSection from '../../components/ProgressSection';
    import DashboardSection from '../../components/DashboardSection';
    import DashboardCard from '../../components/DashboardCard';

    export default {
        name: 'student-home',

        components: {
            Dashboard,
            ProgressSection,
            DashboardSection,
            DashboardCard,
        },

        computed: {
            ...mapGetters(['profile', 'classes']),
        },
    };
</script>

<style lang="scss" scoped>
    .student-home {
        width: 100%;
        max-height: 100%;
        display: grid;
        grid-template-rows: auto auto minmax(0, 3fr) minmax(0, 1fr);
        grid-template-columns: calc(38% - 20px) calc(38% - 20px) 24%;
        gap: 20px;
        grid-template-areas:
            'progress progress progress'
            'greeting greeting greeting'
            'todo upcoming schedule'
            'classes classes schedule';
    }

    section.progress {
        grid-area: progress;
    }

    section.greeting {
        grid-area: greeting;

        .h1 {
            font-size: 70px;

            &.tablet {
                font-size: 50px;
            }
        }
    }

    .todo {
        grid-area: todo;
    }

    .upcoming {
        grid-area: upcoming;
    }

    .classes {
        grid-area: classes;
        overflow: scroll;
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-flow: column;
        text-align: center;
        text-transform: capitalize;

        .class-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            padding: 10px;

            .teacher-img {
                height: 90px;
                width: 90px;
                border-radius: 50%;
                background-image: url('../../assets/images/placeholder-avatar.png');
                background-size: cover;
                background-position: center;
                margin-bottom: 7px;
            }
        }
    }

    .schedule {
        grid-area: schedule;
    }
</style>
