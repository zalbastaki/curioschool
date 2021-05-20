<template>
    <div class="assessment">
        <template v-for="(question, index) in currentAssessment.questions">
            <div
                v-if="currentQuestion === index"
                :key="index"
                class="current-question"
            >
                <div>
                    <base-text class="title" type="h4"
                        >Question {{ index + 1 }}</base-text
                    >
                    <base-text class="question" type="h3">{{
                        question.question
                    }}</base-text>
                    <base-input
                        v-if="question.type === 'short_answer'"
                        type="text"
                        :name="question.id"
                        :placeholder="question.placeholder || 'Answer...'"
                        v-model="submission.answers[index].answer"
                    />
                    <base-input
                        v-if="question.type === 'long_answer'"
                        type="textarea"
                        :name="question.id"
                        :placeholder="question.placeholder || 'Answer...'"
                        v-model="submission.answers[index].answer"
                    />
                </div>
                <div class="buttons">
                    <base-button
                        v-if="index > 0"
                        type="button"
                        button-type="button"
                        color="dark-purple"
                        @click="currentQuestion--"
                    >
                        <fa-icon
                            class="back-icon"
                            :icon="['fas', 'arrow-left']"
                            aria-label="back"
                        />
                        Back
                    </base-button>
                    <base-button
                        v-if="index < currentAssessment.questions.length - 1"
                        type="button"
                        button-type="button"
                        color="purple"
                        @click="next"
                    >
                        Next
                        <fa-icon
                            class="next-icon"
                            :icon="['fas', 'arrow-right']"
                            aria-label="next"
                        />
                    </base-button>
                </div>
                <base-button
                    v-if="index >= currentAssessment.questions.length - 1"
                    type="button"
                    button-type="button"
                    class="finish-btn"
                    color="dark-orange"
                    width="400px"
                    @click="currentQuestion++"
                >
                    Finish Assessment!
                </base-button>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'assessment',

        data() {
            return {
                currentQuestion: 0,
                submission: {
                    id: Date.now(),
                    assessmentId: '',
                    datetime: new Date(),
                    answers: [],
                    grade: '',
                    feedback: '',
                },
            };
        },

        computed: {
            ...mapGetters(['currentAssessment']),
        },

        created() {
            this.updateCurrentAssessment();
            this.currentAssessment.questions.forEach(question => {
                this.submission.answers.push({
                    question: question.question,
                    answer: '',
                });
            });
            this.updateSubmission(this.submission);
        },

        methods: {
            ...mapActions(['updateCurrentAssessment', 'updateSubmission']),

            next() {
                this.updateSubmission(this.submission);
                this.currentQuestion++;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .assessment {
        height: 100%;

        .current-question {
            height: 100%;
            display: flex;
            flex-direction: column;

            .title {
                color: $dark-purple;
            }

            .question {
                margin: 20px 0;
            }

            .base-input {
                width: calc(100% - 30px);

                /deep/ .input {
                    &.textarea {
                        resize: vertical;
                        min-height: 80px;
                    }
                }
            }

            .buttons {
                display: flex;
                margin-top: 30px;
                align-self: center;

                .button {
                    margin-right: 15px;

                    .back-icon {
                        margin-right: 10px;
                    }

                    .next-icon {
                        margin-left: 10px;
                    }
                }
            }

            .finish-btn {
                margin-top: 20px;
                align-self: center;
            }
        }
    }
</style>
