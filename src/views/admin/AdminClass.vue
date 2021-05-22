<template>
    <base-dashboard color="yellow">
        <base-loader :show="!currentAdminClass" />
        <div v-if="currentAdminClass" class="admin-class">
            <router-link class="back-btn" :to="`/admin-classes`">
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </router-link>
            <base-text type="h3">
                {{ currentAdminClass.level }} {{ currentAdminClass.name }}
            </base-text>
            <form @submit.prevent="handleSubmit">
                <base-input
                    type="text"
                    name="name"
                    id="name"
                    label="name"
                    placeholder="name"
                    v-model="currentAdminClass.name"
                />
                <base-input
                    type="text"
                    name="level"
                    label="level"
                    placeholder="level"
                    v-model="currentAdminClass.level"
                />
                <base-input
                    type="text"
                    name="color"
                    id="color"
                    label="color"
                    placeholder="#ffffff"
                    v-model="currentAdminClass.color"
                />
                <base-multi-select
                    :value="teachers"
                    @input="handleTeacherInput"
                    :options="teacherOptions"
                    :customLabel="userLabel"
                    track-by="id"
                    input-label="teachers"
                    class="teachers-input"
                />
                <base-multi-select
                    :value="students"
                    @input="handleStudentInput"
                    :options="studentOptions"
                    :customLabel="userLabel"
                    :closeOnSelect="false"
                    track-by="id"
                    input-label="students"
                    class="students-input"
                />
                <reward-input
                    v-for="(reward, index) in currentAdminClass.rewards"
                    :key="`reward-${index}`"
                    :index="index"
                    v-model="currentAdminClass.rewards[index]"
                    :include-class="false"
                    @delete="deleteReward(index)"
                />
                <base-button
                    type="button"
                    button-type="button"
                    width="100%"
                    height="30px"
                    class="add-btn"
                    @click="addReward"
                >
                    + Add a reward
                </base-button>
                <announcement-input
                    v-for="(announcement,
                    index) in currentAdminClass.announcements"
                    :key="`announcement-${index}`"
                    :index="index"
                    v-model="currentAdminClass.announcements[index]"
                    @delete="deleteAnnouncement(index)"
                />
                <base-button
                    type="button"
                    button-type="button"
                    width="100%"
                    height="30px"
                    class="add-btn"
                    @click="addAnnouncement"
                >
                    + Add an announcement
                </base-button>
                <time-input
                    v-for="(time, index) in currentAdminClass.times"
                    :key="`time-${index}`"
                    :index="index"
                    v-model="currentAdminClass.times[index]"
                    @delete="deleteTime(index)"
                />
                <base-button
                    type="button"
                    button-type="button"
                    width="100%"
                    height="30px"
                    class="add-btn"
                    @click="addTime"
                >
                    + Add a time
                </base-button>
                <assessment-input
                    v-for="(assessment, index) in currentAdminClass.assessments"
                    :key="`assessment-${index}`"
                    :assessment-index="index"
                    v-model="currentAdminClass.assessments[index]"
                    @delete="deleteAssessment(index)"
                />
                <base-button
                    type="button"
                    button-type="button"
                    width="100%"
                    height="30px"
                    class="add-btn"
                    @click="addAssessment"
                >
                    + Add an assessment
                </base-button>
                <base-button type="button" button-type="submit" color="orange">
                    Save
                </base-button>
            </form>
        </div>
        <base-modal
            ref="saveSuccess"
            heading="Successfully saved changes."
            button-color="yellow"
        />
    </base-dashboard>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import RewardInput from '../../components/admin/RewardInput';
    import AnnouncementInput from '../../components/admin/AnnouncementInput';
    import TimeInput from '../../components/admin/TimeInput';
    import AssessmentInput from '../../components/admin/AssessmentInput';

    export default {
        name: 'admin-class',

        components: {
            RewardInput,
            AnnouncementInput,
            TimeInput,
            AssessmentInput,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        computed: {
            ...mapGetters([
                'currentAdminClass',
                'levels',
                'adminStudents',
                'adminTeachers',
            ]),

            teachers() {
                return this.currentAdminClass.teachers.map(teacher => {
                    return this.adminTeachers.find(
                        ({ id }) => id === teacher.id
                    );
                });
            },

            teacherOptions() {
                return this.adminTeachers.filter(({ profile }) => {
                    return profile.levels.find(
                        level => level === this.currentAdminClass.level
                    );
                });
            },

            students() {
                return this.currentAdminClass.students.map(student => {
                    return this.adminStudents.find(
                        ({ id }) => id === student.id
                    );
                });
            },

            studentOptions() {
                return this.adminStudents.filter(({ profile }) => {
                    return profile.level === this.currentAdminClass.level;
                });
            },
        },

        mounted() {
            this.updateCurrentAdminClass();
        },

        methods: {
            ...mapMutations(['setCurrentAdminClass']),

            ...mapActions(['updateCurrentAdminClass', 'adminUpdateClassDoc']),

            userLabel({ profile }) {
                return `${profile.first_name} ${profile.last_name}`;
            },

            handleTeacherInput(value) {
                const teachers = value.map(teacher => {
                    return {
                        id: teacher.id,
                        first_name: teacher.profile.first_name,
                        last_name: teacher.profile.last_name,
                    };
                });
                let clas = { ...this.currentAdminClass };
                clas.teachers = [...teachers];
                this.setCurrentAdminClass(clas);
            },

            handleStudentInput(value) {
                const students = value.map(student => {
                    return {
                        id: student.id,
                        first_name: student.profile.first_name,
                        last_name: student.profile.last_name,
                        points: 0,
                    };
                });
                let clas = { ...this.currentAdminClass };
                clas.students = [...students];
                this.setCurrentAdminClass(clas);
            },

            addReward() {
                this.currentAdminClass.rewards.push({
                    label: '',
                    price: 0,
                });
            },

            deleteReward(index) {
                this.currentAdminClass.rewards.splice(index, 1);
            },

            addAnnouncement() {
                this.currentAdminClass.announcements.push({
                    label: '',
                    timestamp: new Date(),
                });
            },

            deleteAnnouncement(index) {
                this.currentAdminClass.announcements.splice(index, 1);
            },

            addTime() {
                this.currentAdminClass.times.push({
                    start_time: new Date(),
                    end_time: new Date(),
                    repeats: 'none',
                });
            },

            deleteTime(index) {
                this.currentAdminClass.times.splice(index, 1);
            },

            addAssessment() {
                const id = Date.now();
                this.currentAdminClass.assessments.push({
                    id: id,
                    name: '',
                    description: '',
                    type: 'homework',
                    due_date: new Date(),
                    total_grade: 1,
                    weight: 0,
                    coins: 0,
                    points: 0,
                    submissions_limit: 1,
                    time_limit: 1,
                    questions: [],
                });
            },

            deleteAssessment(index) {
                this.currentAdminClass.assessments.splice(index, 1);
            },

            handleSubmit() {
                this.adminUpdateClassDoc(this.currentAdminClass).then(() => {
                    this.$refs.saveSuccess.openModal();
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .admin-class {
        .back-btn {
            color: $black;
            font-size: 30px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid $orange;
            background: lighten($orange, 25%);
            margin-bottom: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            &:hover {
                margin-left: -3px;
            }
        }

        .h3 {
            text-transform: capitalize;
        }

        form {
            display: flex;
            flex-direction: column;

            .button {
                align-self: center;
                margin-top: 15px;
            }
        }

        .base-input {
            margin-top: 15px;

            /deep/ .input {
                width: calc(100% - 30px);

                &.select {
                    width: 100%;
                }
            }
        }

        .students-input,
        .teachers-input {
            margin-top: 15px;
        }

        .add-btn {
            margin-top: 15px;
            font-size: 18px;
            text-transform: none;
        }
    }
</style>
