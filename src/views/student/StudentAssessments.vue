<template>
    <base-dashboard>
        <base-loader :show="!currentClass" />
        <div v-if="currentClass" class="student-assessments">
            <router-link
                class="back-btn"
                :to="`/student-class/${id}`"
                :style="{
                    background: `${currentClass.color}44`,
                    borderColor: currentClass.color,
                }"
            >
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </router-link>
            <base-text type="h1">{{ currentClass.name }} {{ type }}</base-text>
            <template
                v-if="
                    currentClass.upcomingAssessments &&
                        currentClass.upcomingAssessments[singularType].length >
                            0
                "
            >
                <router-link
                    v-for="(assessment, index) in currentClass
                        .upcomingAssessments[singularType]"
                    :key="`upcoming-${index}`"
                    :to="
                        `/student-assessment/${currentClass.id}/${assessment.id}`
                    "
                    class="assessment"
                    :style="{
                        background: `${currentClass.color}44`,
                        borderColor: currentClass.color,
                    }"
                >
                    <div
                        class="due-date"
                        :style="{ borderColor: currentClass.color }"
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
            </template>
            <template v-else>
                <base-text class="empty-msg" type="p"
                    >You have no upcoming {{ currentClass.name }}
                    {{ type }}.</base-text
                >
            </template>
            <template
                v-if="
                    currentClass.pastAssessments &&
                        currentClass.pastAssessments[singularType].length > 0
                "
            >
                <base-text class="past-heading" type="h4"
                    >Past {{ type }}:</base-text
                >
                <router-link
                    v-for="(assessment, index) in currentClass.pastAssessments[
                        singularType
                    ]"
                    :key="`past-${index}`"
                    :to="
                        `/student-assessment/${currentClass.id}/${assessment.id}`
                    "
                    class="assessment"
                    :style="{
                        background: `${currentClass.color}44`,
                        borderColor: currentClass.color,
                    }"
                >
                    <div
                        class="due-date"
                        :style="{ borderColor: currentClass.color }"
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
            </template>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'student-assessments',

        props: {
            id: {
                type: String,
                required: true,
            },

            type: {
                type: String,
                required: true,
            },
        },

        computed: {
            ...mapGetters(['currentClass']),

            singularType() {
                if (this.type === 'projects') return 'project';
                if (this.type === 'quizzes') return 'quiz';
                if (this.type === 'tests') return 'test';
                return this.type;
            },
        },

        created() {
            this.updateCurrentClass();
        },

        methods: {
            ...mapActions(['updateCurrentClass']),

            getDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) {
                    datejs = date.toDate();
                }
                return moment(datejs).format('Do MMM');
            },

            getTime(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) {
                    datejs = date.toDate();
                }
                return moment(datejs).format('h:mm a');
            },

            pastDate(date) {
                let datejs = new Date(date);
                if (isNaN(datejs)) {
                    datejs = date.toDate();
                }
                const now = new Date();
                return datejs < now;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .student-assessments {
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

            &:hover {
                margin-left: -3px;
            }
        }

        .h1 {
            font-size: 50px;
            text-transform: capitalize;

            &.tablet {
                font-size: 45px;
            }
        }

        .assessment {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 10px;
            border-width: 2px;
            border-style: solid;
            margin: 8px 0;
            text-decoration: none;
            color: $black;

            &:hover {
                border-width: 3px;
            }

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

        .empty-msg {
            margin-top: 20px;
        }

        .past-heading {
            margin-top: 20px;
        }
    }
</style>
