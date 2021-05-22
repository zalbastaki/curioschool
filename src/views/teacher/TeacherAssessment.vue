<template>
    <base-dashboard color="dark-orange">
        <base-loader :show="!currentAssessment" />
        <assessment-information v-if="currentAssessment" />
    </base-dashboard>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AssessmentInformation from '../../components/student/assessment/AssessmentInformation';

    export default {
        name: 'teacher-assessment',

        components: {
            AssessmentInformation,
        },

        computed: {
            ...mapGetters(['currentAssessment', 'currentSubmissions']),
        },

        created() {
            this.updateCurrentAssessment();
            this.updateCurrentSubmissions();
        },

        methods: {
            ...mapActions([
                'updateCurrentAssessment',
                'updateCurrentSubmissions',
            ]),
        },
    };
</script>

<style lang="scss" scoped>
    .teacher-assessment {
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
            cursor: pointer;

            &:hover {
                margin-left: -3px;
            }
        }

        .title {
            text-transform: capitalize;
            margin: 15px 0 15px;
        }
    }
</style>
