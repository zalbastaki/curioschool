<template>
    <base-dashboard color="dark-orange">
        <base-loader :show="!profile || classes.length === 0" />
        <div v-if="profile && classes.length > 0" class="teacher-home">
            <section class="top-bar">
                <base-text type="h1">Hey {{ profile.first_name }}!</base-text>
            </section>
            <teacher-to-do-section />
            <upcoming-section />
            <schedule-section />
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import TeacherToDoSection from '../../components/teacher/home/TeacherToDoSection';
    import UpcomingSection from '../../components/student/home/UpcomingSection';
    import ScheduleSection from '../../components/student/home/ScheduleSection';

    export default {
        name: 'teacher-home',

        components: {
            TeacherToDoSection,
            UpcomingSection,
            ScheduleSection,
        },

        computed: {
            ...mapGetters(['profile', 'classes']),
        },
    };
</script>

<style lang="scss" scoped>
    .teacher-home {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: calc(35% - 20px) calc(35% - 20px) 30%;
        gap: 20px;
        grid-template-areas:
            'top-bar top-bar top-bar'
            'todos upcoming schedule';
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

    .schedule {
        grid-area: schedule;
    }
</style>
