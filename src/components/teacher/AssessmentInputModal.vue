<template>
    <base-modal
        ref="addAssessment"
        class="assessment-modal"
        heading="Add Assessment"
    >
        <template v-slot:body>
            <assessment-input
                :assessment-index="0"
                v-model="assessment"
                :allow-delete="false"
            />
        </template>
        <template v-slot:footer>
            <base-button
                type="button"
                button-type="submit"
                color="dark-orange"
                @click="addAssessment"
            >
                Add
            </base-button>
        </template>
    </base-modal>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import moment from 'moment';
    import AssessmentInput from '../admin/AssessmentInput';

    export default {
        name: 'assessment-input-modal',

        components: {
            AssessmentInput,
        },

        data() {
            return {
                assessment: {
                    id: Date.now(),
                    name: '',
                    description: '',
                    type: this.type(),
                    due_date: moment()
                        .add(1, 'days')
                        .format('YYYY-MM-DD'),
                    total_grade: 1,
                    weight: 0,
                    coins: 0,
                    points: 0,
                    submissions_limit: 0,
                    time_limit: 0,
                    questions: [],
                },
            };
        },

        computed: {
            ...mapGetters(['currentClass']),
        },

        methods: {
            ...mapActions(['updateClassDoc']),

            type() {
                const plural = this.$router.currentRoute.params.type;
                if (plural === 'projects') return 'project';
                if (plural === 'quizzes') return 'quiz';
                if (plural === 'tests') return 'test';
                return plural;
            },

            addAssessment() {
                const clas = this.currentClass;
                clas.assessments.push(this.assessment);
                this.updateClassDoc(clas);
                this.$refs.addAssessment.closeModal();
                this.reset();
            },

            openModal() {
                this.$refs.addAssessment.openModal();
            },

            reset() {
                this.assessment = {
                    id: Date.now(),
                    name: '',
                    description: '',
                    type: this.type(),
                    due_date: moment()
                        .add(1, 'days')
                        .format('YYYY-MM-DD'),
                    total_grade: 1,
                    weight: 0,
                    coins: 0,
                    points: 0,
                    submissions_limit: 0,
                    time_limit: 0,
                    questions: [],
                };
            },
        },
    };
</script>

<style lang="scss" scoped>
    .assessment-modal {
        /deep/ .dialog {
            width: 800px !important;
        }
    }
</style>
