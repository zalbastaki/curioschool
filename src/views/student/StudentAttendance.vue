<template>
    <base-dashboard>
        <base-loader :show="!profile" />
        <div v-if="profile" class="student-attendance">
            <section class="top-bar">
                <base-text type="h1">Attendance</base-text>
                <progress-section />
            </section>
            <!-- TO DO -->
            <base-text type="p">Coming soon!</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProgressSection from '../../components/student/ProgressSection';

    export default {
        name: 'student-attendance',

        components: {
            ProgressSection,
        },

        computed: {
            ...mapGetters(['profile']),
        },
    };
</script>

<style lang="scss" scoped>
    .student-attendance {
        .top-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .h1 {
                font-size: 50px;
            }
        }
    }
</style>
