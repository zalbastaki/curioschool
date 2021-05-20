<template>
    <base-dashboard>
        <base-loader :show="!currentAssessment" />
        <assessment-information
            v-if="currentAssessment && !inProgress"
            @start="inProgress = true"
        />
        <assessment v-if="currentAssessment && inProgress" />
    </base-dashboard>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import AssessmentInformation from '../../components/student/assessment/AssessmentInformation';
    import Assessment from '../../components/student/assessment/Assessment';

    export default {
        name: 'student-assessment',

        components: {
            AssessmentInformation,
            Assessment,
        },

        data() {
            return {
                inProgress: false,
            };
        },

        computed: {
            ...mapGetters(['currentAssessment']),
        },

        created() {
            this.updateCurrentAssessment();
        },

        methods: {
            ...mapActions(['updateCurrentAssessment']),
        },
    };
</script>

<style lang="scss" scoped></style>
