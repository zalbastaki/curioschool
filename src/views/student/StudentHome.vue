<template>
    <dashboard>
        <div class="student-home">
            <section class="top-bar">
                <base-text type="h1">Hey {{ profile.first_name }}!</base-text>
                <progress-section />
            </section>
            <to-do-section />
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
                    :background="`${clas.color}44`"
                    :border="clas.color"
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
    import ToDoSection from '../../components/ToDoSection';
    import DashboardSection from '../../components/DashboardSection';
    import DashboardCard from '../../components/DashboardCard';

    export default {
        name: 'student-home',

        components: {
            Dashboard,
            ProgressSection,
            ToDoSection,
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
        grid-template-rows: auto minmax(0, 3fr) minmax(0, 1fr);
        grid-template-columns: calc(35% - 20px) calc(35% - 20px) 30%;
        gap: 20px;
        grid-template-areas:
            'top-bar top-bar top-bar'
            'todos upcoming schedule'
            'classes classes schedule';
    }

    .top-bar {
        grid-area: top-bar;
        display: flex;
        justify-content: space-between;

        .h1 {
            font-size: 50px;
        }
    }

    .todos {
        grid-area: todos;
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
