<template>
    <div class="assessment-information">
        <a
            class="back-btn"
            @click="$router.go(-1)"
            :style="{
                background: `${currentAssessment.class.color}44`,
                borderColor: currentAssessment.class.color,
            }"
        >
            <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
        </a>
        <div class="student-assessment-content">
            <div class="text-content">
                <base-text class="title" type="h3">
                    {{ currentAssessment.type }}:
                    {{ ' ' + currentAssessment.name }}
                </base-text>
                <base-text class="description" type="p">
                    {{ currentAssessment.description }}
                </base-text>
                <div class="details">
                    <base-text type="p">
                        <fa-icon
                            :icon="['fas', 'calendar-day']"
                            class="icon"
                            :style="{
                                color: currentAssessment.class.color,
                            }"
                        />
                        This {{ isPast ? 'was' : 'is' }} due on the
                        <strong>
                            {{ formatDate(currentAssessment.due_date) }}
                        </strong>
                    </base-text>
                    <base-text type="p">
                        <fa-icon
                            :icon="['fas', 'clipboard']"
                            class="icon"
                            :style="{
                                color: currentAssessment.class.color,
                            }"
                        />
                        The full mark {{ isPast ? 'was' : 'is' }}
                        <strong> {{ currentAssessment.total_grade }}</strong>
                    </base-text>
                    <base-text v-if="currentAssessment.coins > 0" type="p">
                        <fa-icon
                            :icon="['fas', 'coins']"
                            class="icon"
                            :style="{
                                color: currentAssessment.class.color,
                            }"
                        />
                        You can get up to
                        <strong> {{ currentAssessment.coins }} coins</strong>
                    </base-text>
                    <base-text v-if="currentAssessment.points > 0" type="p">
                        <fa-icon
                            :icon="['fas', 'star']"
                            class="icon"
                            :style="{
                                color: currentAssessment.class.color,
                            }"
                        />
                        You can get up to
                        <strong> {{ currentAssessment.points }} points</strong>
                    </base-text>
                    <base-text
                        v-if="currentAssessment.submissions_limit > 0"
                        type="p"
                    >
                        <fa-icon
                            :icon="['fas', 'copy']"
                            class="icon"
                            :style="{
                                color: currentAssessment.class.color,
                            }"
                        />
                        You can submit
                        <strong>
                            {{ currentAssessment.submissions_limit }} time{{
                                currentAssessment.submissions_limit > 1
                                    ? 's'
                                    : ''
                            }}
                        </strong>
                    </base-text>
                    <base-text v-if="currentAssessment.time_limit > 0" type="p">
                        <fa-icon
                            :icon="['fas', 'stopwatch']"
                            class="icon"
                            :style="{
                                color: currentAssessment.class.color,
                            }"
                        />
                        You have
                        <strong>
                            {{ currentAssessment.time_limit }} minute{{
                                currentAssessment.submissions_limit > 1
                                    ? 's'
                                    : ''
                            }}
                        </strong>
                        to complete this
                    </base-text>
                </div>
                <base-button
                    v-if="canStart"
                    type="button"
                    button-type="button"
                    color="yellow"
                    width="400px"
                    @click="$emit('start')"
                >
                    Start Assessment
                </base-button>
            </div>
            <base-section
                class="submissions"
                heading="Submissions"
                :background="`${currentAssessment.class.color}44`"
                :border="currentAssessment.class.color"
            >
                <template v-if="role === 'student'">
                    <base-text
                        v-if="
                            !currentAssessment.submissions ||
                                currentAssessment.submissions.length === 0
                        "
                        class="no-submissions"
                        type="p"
                    >
                        You have no submissions for this assessment.
                    </base-text>
                    <div
                        v-for="(submission,
                        index) in currentAssessment.submissions"
                        :key="`submission-${index}`"
                        class="submission-preview"
                        :style="{
                            borderColor: currentAssessment.class.color,
                        }"
                    >
                        <div
                            class="submission-date"
                            :style="{
                                borderColor: currentAssessment.class.color,
                            }"
                            @click="
                                openSubmissionModal(
                                    submission,
                                    currentAssessment
                                )
                            "
                        >
                            {{ formatDate(submission.datetime) }}
                        </div>
                        <div class="submission-grade">
                            {{ submission.grade }}/{{
                                currentAssessment.total_grade
                            }}
                        </div>
                    </div>
                </template>
                <template v-if="role === 'teacher'">
                    <base-text
                        v-if="currentSubmissions.length === 0"
                        class="no-submissions"
                        type="p"
                    >
                        There are no submissions for this assessment.
                    </base-text>
                    <div
                        v-for="(submission, index) in currentSubmissions"
                        :key="`submission-${index}`"
                        class="submission-preview"
                        :style="{
                            borderColor: currentAssessment.class.color,
                        }"
                    >
                        <div
                            class="submission-date"
                            :style="{
                                borderColor: currentAssessment.class.color,
                            }"
                            @click="
                                openSubmissionModal(
                                    submission,
                                    currentAssessment
                                )
                            "
                        >
                            {{ submission.student.profile.first_name }}
                            {{ submission.student.profile.last_name }} on
                            {{ formatDate(submission.datetime) }}
                        </div>
                        <div class="submission-grade">
                            {{ submission.grade }}/{{
                                currentAssessment.total_grade
                            }}
                        </div>
                    </div>
                </template>
                <submission-modal ref="submissionModal" />
            </base-section>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import moment from 'moment';
    import SubmissionModal from './SubmissionModal';

    export default {
        name: 'assessment-information',

        components: {
            SubmissionModal,
        },

        computed: {
            ...mapGetters(['currentAssessment', 'currentSubmissions', 'role']),

            isPast() {
                let due_date = new Date(this.currentAssessment.due_date);
                if (isNaN(due_date)) {
                    due_date = this.currentAssessment.due_date.toDate();
                }
                const now = new Date();

                return due_date < now;
            },

            submissionLimitReached() {
                return (
                    this.currentAssessment.submissions_limit !== 0 &&
                    this.currentAssessment.submissions_limit <=
                        this.currentAssessment.submissions.length
                );
            },

            canStart() {
                return (
                    !this.isPast &&
                    !this.submissionLimitReached &&
                    this.currentAssessment.questions.length > 0 &&
                    this.role === 'student'
                );
            },

            canEdit() {
                return this.role === 'teacher';
            },
        },

        created() {
            this.updateCurrentAssessment();
        },

        methods: {
            ...mapActions(['updateCurrentAssessment']),

            formatDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) {
                    datejs = date.toDate();
                }
                return moment(datejs).format('Do [of] MMM [at] h:mm a');
            },

            openSubmissionModal(submission, assessment) {
                this.$refs.submissionModal.openModal(submission, assessment);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .assessment-information {
        display: flex;
        flex-direction: column;
        height: 100%;

        .back-btn {
            color: $black;
            font-size: 30px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border-width: 3px;
            border-style: solid;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
                margin-left: -3px;
            }
        }

        .student-assessment-content {
            flex: 1;
            width: 100%;
            display: grid;
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            grid-template-rows: minmax(0, 1fr);
            gap: 20px;
            grid-template-areas: 'text-content submissions';

            .text-content {
                grid-area: text-content;

                .title {
                    text-transform: capitalize;
                    margin: 15px 0 15px;
                }

                .description {
                    font-weight: bold;
                }

                .details {
                    margin-top: 50px;

                    .icon {
                        width: 25px;
                    }

                    .p {
                        margin-bottom: 5px;
                        font-size: 18px;
                    }
                }

                .button {
                    margin-top: 50px;
                }
            }

            .submissions {
                grid-area: submissions;

                /deep/ .content {
                    padding: 0;
                }

                .no-submissions {
                    opacity: 60%;
                    font-size: 16px;
                    font-style: italic;
                    padding: 10px 15px;
                }

                .submission-preview {
                    border-bottom-width: 4px;
                    border-bottom-style: solid;
                    display: flex;
                    align-items: center;

                    .submission-date {
                        padding: 10px 15px;
                        min-width: 180px;
                        border-right-width: 2px;
                        border-right-style: solid;
                        cursor: pointer;

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    .submission-grade {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-width: 80px;
                    }
                }
            }
        }
    }
</style>
