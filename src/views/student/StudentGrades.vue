<template>
    <base-dashboard>
        <base-loader :show="!profile" />
        <div v-if="profile" class="student-grades">
            <section class="top-bar">
                <base-text type="h1">Grades</base-text>
                <progress-section />
            </section>
            <base-section
                v-for="(clas, index) in classes"
                :key="`class-${index}`"
                class="class"
                :heading="clas.name"
                :background="`${clas.color}44`"
                :border="clas.color"
            >
                <base-text v-if="clas.assessments.length === 0" type="p">
                    There are no assessments set for this class yet.
                </base-text>
                <template v-else>
                    <div
                        v-for="(assessment, index) in clas.assessments"
                        :key="`assessment-${index}`"
                        class="assessment"
                        :style="{ borderColor: clas.color }"
                    >
                        <div
                            class="type"
                            :style="{
                                background: `${clas.color}44`,
                                borderColor: clas.color,
                            }"
                        >
                            {{ assessment.type }}
                        </div>
                        <div class="name" :style="{ borderColor: clas.color }">
                            {{ assessment.name }}
                        </div>
                        <div class="grade">
                            {{ getGrade(assessment.id) }}/{{
                                assessment.total_grade
                            }}
                        </div>
                    </div>
                </template>
            </base-section>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProgressSection from '../../components/student/ProgressSection';

    export default {
        name: 'student-grades',

        components: {
            ProgressSection,
        },

        computed: {
            ...mapGetters(['classes', 'profile']),
        },

        methods: {
            getGrade(id) {
                const submissions = this.profile.submissions.filter(
                    ({ assessmentId }) => assessmentId === id
                );
                const grades = submissions.map(({ grade }) => parseInt(grade));
                grades.forEach((grade, i) => {
                    if (isNaN(grade)) grades.splice(i, 1);
                });
                if (grades.length === 0) return;
                return Math.max(...grades);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .student-grades {
        .top-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .h1 {
                font-size: 50px;
            }
        }

        .class {
            margin-bottom: 20px;

            /deep/ .content {
                padding: 0;
            }

            .assessment {
                display: flex;

                &:not(:last-of-type) {
                    border-bottom-width: 2px;
                    border-bottom-style: solid;
                }

                .type {
                    border-right-width: 2px;
                    border-right-style: solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 130px;
                    text-transform: capitalize;
                    font-weight: bold;
                }

                .name {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    border-right-width: 2px;
                    border-right-style: solid;
                    padding: 10px;
                }

                .grade {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 100px;
                    font-weight: bold;
                    font-size: 18px;
                    padding: 10px 0;
                }
            }
        }
    }
</style>
