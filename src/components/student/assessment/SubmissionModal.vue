<template>
    <base-modal ref="submission" class="submission-modal" heading="Submission">
        <template v-slot:body>
            <base-text class="info-item" type="p">
                <span class="label">Assessment: </span>
                {{ assessment.name }}
            </base-text>
            <base-text class="info-item" type="p">
                <span class="label">Submitted: </span>
                {{ formatDate(submission.datetime) }}
            </base-text>
            <base-text class="label" type="p">Answers:</base-text>
            <div
                v-for="(answer, index) in submission.answers"
                :key="`answer-${index}`"
                class="question-answer"
            >
                <base-text class="question" type="p">
                    Q{{ index + 1 }}. {{ answer.question }}
                </base-text>
                <base-text class="answer" type="p">
                    A{{ index + 1 }}. {{ answer.answer }}
                </base-text>
            </div>
        </template>
        <template v-if="role === 'teacher'" v-slot:footer>
            <form @submit.prevent="addGrade">
                <base-input
                    type="number"
                    name="grade"
                    :min="0"
                    :max="assessment.total_grade"
                    :label="`Grade /${assessment.total_grade}`"
                    placeholder="Grade"
                    v-model="data.grade"
                />
                <base-input
                    type="number"
                    name="coins"
                    :min="0"
                    :max="assessment.coins"
                    :label="`Coins /${assessment.coins}`"
                    placeholder="Coins"
                    v-model="data.coins"
                />
                <base-input
                    type="number"
                    name="points"
                    :min="0"
                    :max="assessment.points"
                    :label="`Points /${assessment.points}`"
                    placeholder="Points"
                    v-model="data.points"
                />
                <base-input
                    type="textarea"
                    name="feedback"
                    label="Feedback"
                    placeholder="Feedback"
                    v-model="data.feedback"
                />
                <base-button
                    type="button"
                    button-type="submit"
                    color="dark-orange"
                >
                    Save
                </base-button>
            </form>
        </template>
    </base-modal>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'submission-modal',

        props: {
            assessment: {
                type: Object,
                required: true,
            },

            submission: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                data: {
                    grade: 0,
                    points: 0,
                    coins: 0,
                    feedback: '',
                },
            };
        },

        computed: {
            ...mapGetters(['role']),
        },

        methods: {
            ...mapActions(['addStudentGrade']),

            formatDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) {
                    datejs = date.toDate();
                }
                return moment(datejs).format('Do [of] MMM [at] h:mm a');
            },

            addGrade() {
                this.addStudentGrade({
                    studentId: this.submission.student.id,
                    submissionId: this.submission.id,
                    data: this.data,
                });
                this.$refs.submission.closeModal();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .submission-modal {
        /deep/ .dialog {
            width: 800px !important;
        }

        /deep/ .body {
            padding: 30px 50px 15px !important;

            .info-item {
                margin-bottom: 20px;

                .label {
                    font-weight: bold;
                }
            }

            .label {
                font-weight: bold;
                margin-bottom: 5px;
            }

            .question-answer {
                .p {
                    font-size: 18px;
                }

                .question {
                    font-weight: bold;
                    margin-bottom: 2px;
                }

                &:not(:first-of-type) {
                    margin-top: 10px;
                }
            }
        }

        /deep/ .footer {
            width: calc(100% - 110px);

            .base-input:not(:first-of-type) {
                margin-top: 15px;
            }

            .button {
                margin: 20px auto 0;
            }
        }
    }
</style>
