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
                <base-text v-for="(num, index) in 20" :key="index" type="p"
                    >Test item</base-text
                >
            </dashboard-section>
            <section class="schedule">
                <base-text type="h3">Schedule</base-text>
            </section>
            <section class="class-links">
                <base-text type="h3">Classes</base-text>
                <base-text v-for="(num, index) in 20" :key="index" type="p"
                    >Test item</base-text
                >
            </section>
        </div>
    </dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Dashboard from '../../components/Dashboard';
    import ProgressSection from '../../components/ProgressSection';
    import DashboardSection from '../../components/DashboardSection';

    export default {
        name: 'student-home',

        components: {
            Dashboard,
            ProgressSection,
            DashboardSection,
        },

        computed: {
            ...mapGetters(['profile']),
        },
    };
</script>

<style lang="scss" scoped>
    .student-home {
        width: 100%;
        max-height: 100%;
        display: grid;
        grid-template-rows: auto auto minmax(0, 2fr) minmax(0, 1fr);
        grid-template-columns: calc(38% - 20px) calc(38% - 20px) 24%;
        gap: 20px;
        grid-template-areas:
            'progress progress progress'
            'greeting greeting greeting'
            'todo upcoming schedule'
            'class-links class-links schedule';
    }

    section.progress {
        grid-area: progress;
    }

    section.greeting {
        grid-area: greeting;

        .h1 {
            font-size: 70px;
        }
    }

    .todo {
        grid-area: todo;
    }

    .upcoming {
        grid-area: upcoming;
    }

    .class-links {
        grid-area: class-links;
        overflow: scroll;
    }

    .schedule {
        grid-area: schedule;
    }
</style>
