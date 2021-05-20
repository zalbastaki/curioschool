<template>
    <base-dashboard>
        <base-loader :show="!profile || classes.length === 0" />
        <div v-if="profile && classes.length > 0" class="student-home">
            <section class="top-bar">
                <base-text type="h1">Hey {{ profile.first_name }}!</base-text>
                <progress-section />
            </section>
            <to-do-section />
            <upcoming-section />
            <schedule-section />
            <classes-section />
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProgressSection from '../../components/student/ProgressSection';
    import ToDoSection from '../../components/student/home/ToDoSection';
    import UpcomingSection from '../../components/student/home/UpcomingSection';
    import ScheduleSection from '../../components/student/home/ScheduleSection';
    import ClassesSection from '../../components/student/home/ClassesSection';

    export default {
        name: 'student-home',

        components: {
            ProgressSection,
            ToDoSection,
            UpcomingSection,
            ScheduleSection,
            ClassesSection,
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
    }

    .schedule {
        grid-area: schedule;
    }
</style>
