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
                        This is due on the
                        <strong>
                            {{ formatDate(currentAssessment.due_date) }}</strong
                        >
                    </base-text>
                    <base-text type="p">
                        <fa-icon
                            :icon="['fas', 'clipboard']"
                            class="icon"
                            :style="{
                                color: currentAssessment.class.color,
                            }"
                        />
                        The full mark is
                        <strong> {{ currentAssessment.total_grade }}</strong>
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
                <base-text
                    v-if="!currentAssessment.submissions"
                    class="no-submissions"
                    type="p"
                >
                    You have no submissions for this assessment.
                </base-text>
            </base-section>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'assessment-information',

        computed: {
            ...mapGetters(['currentAssessment']),

            canStart() {
                let due_date = new Date(this.currentAssessment.due_date);
                if (isNaN(due_date)) {
                    due_date = this.currentAssessment.due_date.toDate();
                }
                const now = new Date();

                return due_date > now;
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

                .no-submissions {
                    opacity: 60%;
                    font-size: 16px;
                    font-style: italic;
                }
            }
        }
    }
</style>
