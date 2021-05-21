<template>
    <base-section class="upcoming" heading="Upcoming Assessments">
        <template v-for="(type, index) in assessmentTypes">
            <section
                v-if="
                    upcomingAssessments[type] &&
                        upcomingAssessments[type].length > 0
                "
                :key="`type-${index}`"
            >
                <base-text type="h5">{{ type }}:</base-text>
                <router-link
                    v-for="(assessment, index) in upcomingAssessments[type]"
                    :key="`${type}-${index}`"
                    :to="
                        `/${role}-assessment/${assessment.classId}/${assessment.id}`
                    "
                    class="assessment"
                    :style="{
                        background: `${assessment.color}44`,
                        borderColor: assessment.color,
                    }"
                >
                    <div
                        class="due-date"
                        :style="{ borderColor: assessment.color }"
                    >
                        <div class="day">
                            {{ getDate(assessment.due_date) }}
                        </div>
                        <div class="time">
                            {{ getTime(assessment.due_date) }}
                        </div>
                    </div>
                    <div class="name">{{ assessment.name }}</div>
                </router-link>
            </section>
        </template>
    </base-section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'upcoming-section',

        data() {
            return {
                assessmentTypes: [
                    'homework',
                    'classwork',
                    'project',
                    'quiz',
                    'test',
                ],
            };
        },

        computed: {
            ...mapGetters(['upcomingAssessments', 'role']),
        },

        methods: {
            getDate(date) {
                return moment(date).format('Do MMM');
            },

            getTime(date) {
                return moment(date).format('h:mm a');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .upcoming {
        .h5 {
            text-transform: capitalize;
        }

        .assessment {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 10px;
            border-width: 2px;
            border-style: solid;
            margin: 8px 0;
            color: $black;
            text-decoration: none;

            .due-date {
                min-width: 65px;
                padding-right: 10px;
                text-align: center;
                border-right-width: 2px;
                border-right-style: solid;

                .day {
                    font-size: 15px;
                    font-weight: bold;
                }

                .time {
                    font-size: 12px;
                }
            }

            .name {
                margin-left: 10px;
                font-size: 16px;
            }
        }
    }
</style>
