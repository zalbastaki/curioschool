<template>
    <div class="assessment">
        <div v-if="currentAssessment.time_limit > 0" class="timer">
            Time remaining: {{ formattedTime }}
        </div>
        <template v-for="(question, index) in currentAssessment.questions">
            <div
                v-if="currentQuestion === index"
                :key="index"
                class="current-question"
            >
                <div>
                    <base-text class="title" type="h4">
                        Question {{ index + 1 }} /
                        {{ currentAssessment.questions.length }}
                    </base-text>
                    <base-text class="question" type="h3">
                        {{ question.question }}
                    </base-text>
                    <base-input
                        v-if="question.type === 'short_answer'"
                        type="text"
                        :name="index.toString()"
                        :placeholder="question.placeholder || 'Answer...'"
                        v-model="submission.answers[index].answer"
                    />
                    <base-input
                        v-if="question.type === 'long_answer'"
                        type="textarea"
                        :name="index.toString()"
                        :placeholder="question.placeholder || 'Answer...'"
                        v-model="submission.answers[index].answer"
                    />
                    <div v-if="question.type === 'select' && !question.multi">
                        <div
                            v-for="(option, i) in question.options"
                            :key="`option-${i}`"
                            class="option"
                        >
                            <input
                                type="radio"
                                :id="option"
                                :name="index.toString()"
                                v-model="submission.answers[index].answer"
                                :value="option"
                            />
                            <label :for="option">{{ option }}</label>
                        </div>
                    </div>
                    <div v-if="question.type === 'select' && question.multi">
                        <div
                            v-for="(option, i) in question.options"
                            :key="`option-${i}`"
                            class="option"
                        >
                            <input
                                type="checkbox"
                                :id="option"
                                :name="`${index.toString()}-${i.toString()}`"
                                :value="option"
                                @input="
                                    e =>
                                        handleMutliSelectInput(
                                            e,
                                            index,
                                            question.limit
                                        )
                                "
                            />
                            <label :for="option">{{ option }}</label>
                        </div>
                    </div>
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
                        :disabled="
                            question.required &&
                                (!submission.answers[index].answer ||
                                    submission.answers[index].answer.length ===
                                        0)
                        "
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
                    @click="finish"
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
                isRunning: false,
                timer: null,
                time: 0,
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

            formattedTime() {
                let time = this.time / 60;
                let hours = parseInt(time / 60);
                let minutes = parseInt(time - hours * 60);
                let seconds = Math.round((time - minutes - hours * 60) * 60);
                if (seconds < 10) seconds = `0${seconds}`;
                if (hours > 0) {
                    if (minutes < 10) minutes = `0${minutes}`;
                    return `${hours}:${minutes}:${seconds}`;
                }
                return `${minutes}:${seconds}`;
            },
        },

        created() {
            this.updateCurrentAssessment();
            this.currentAssessment.questions.forEach(question => {
                this.submission.answers.push({
                    question: question.question,
                    answer: question.multi ? [] : '',
                });
            });
            this.updateSubmission(this.submission);
        },

        mounted() {
            if (this.currentAssessment.time_limit > 0) {
                this.time = this.currentAssessment.time_limit * 60;
                this.startTimer();
            }
        },

        methods: {
            ...mapActions(['updateCurrentAssessment', 'updateSubmission']),

            handleMutliSelectInput(e, index, limit) {
                const limitReached =
                    limit > 0 &&
                    this.submission.answers[index].answer.length >= limit;
                let submission = this.submission;
                let exists = false;

                submission.answers[index].answer.forEach((answer, i) => {
                    if (answer === e.target.value) {
                        exists = true;
                        this.submission.answers[index].answer.splice(i, 1);
                    }
                });

                if (limitReached) return (e.target.checked = false);

                if (!exists && !limitReached) {
                    this.submission.answers[index].answer.push(e.target.value);
                }
            },

            startTimer() {
                this.isRunning = true;
                if (!this.timer) {
                    this.timer = setInterval(() => {
                        if (this.time > 0) {
                            this.time--;
                        } else {
                            clearInterval(this.timer);
                            this.finish();
                        }
                    }, 1000);
                }
            },

            stopTimer() {
                this.isRunning = false;
                clearInterval(this.timer);
                this.timer = null;
            },

            resetTimer() {
                this.stopTimer();
                this.time = 0;
            },

            next() {
                this.updateSubmission(this.submission);
                this.currentQuestion++;
            },

            finish() {
                this.updateSubmission(this.submission);
                this.resetTimer();
                this.$router.go();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .assessment {
        height: 100%;
        position: relative;

        .timer {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
        }

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

            .option {
                margin-bottom: 10px;
                display: flex;
                align-items: center;

                label {
                    font-size: 25px;
                    margin-left: 5px;
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
