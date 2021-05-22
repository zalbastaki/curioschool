<template>
    <base-section
        class="leaderboard"
        :heading="role === 'student' ? 'leaderboard' : 'students'"
        :background="`${color}44`"
        :border="color"
    >
        <div
            v-for="(student, index) in leaderboard"
            :key="index"
            class="leaderboard-item"
            :style="{ borderColor: color }"
        >
            <div
                class="rank"
                :style="{ background: `${color}44`, borderColor: color }"
            >
                {{ index + 1 }}
            </div>
            <div
                class="name"
                :class="[role]"
                @click="openStudentModal(student)"
            >
                <base-text type="p">
                    {{ student.first_name || student.profile.first_name }}
                    {{ student.last_name || student.profile.last_name }}
                </base-text>
            </div>
            <div class="points" :style="{ borderColor: color }">
                {{ student.points || student.classPoints }}
            </div>
        </div>
        <student-modal ref="studentModal" />
    </base-section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import StudentModal from '../../teacher/StudentModal';

    export default {
        name: 'leaderboard-section',

        components: {
            StudentModal,
        },

        computed: {
            ...mapGetters(['currentClass', 'role', 'currentStudents']),

            leaderboard() {
                let students = [];
                if (this.role === 'teacher') {
                    students = this.currentStudents;
                    students.forEach(student => {
                        const classPoints = this.currentClass.students.find(
                            ({ id }) => id === student.id
                        ).points;
                        student.classPoints = classPoints;
                    });
                    return students.sort((a, b) => {
                        return b.classPoints - a.classPoints;
                    });
                } else if (this.role === 'student') {
                    students = this.currentClass.students;
                    return students.sort((a, b) => {
                        return b.points - a.points;
                    });
                }
                return students;
            },

            color() {
                return this.currentClass.color;
            },
        },

        methods: {
            openStudentModal(student) {
                if (this.role !== 'teacher') return;
                this.$refs.studentModal.openModal(student);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .leaderboard {
        /deep/ .content {
            padding: 0 !important;
        }

        .leaderboard-item {
            display: flex;
            justify-content: space-between;
            cursor: pointer;

            &:not(:last-of-type) {
                border-bottom-width: 2px;
                border-bottom-style: solid;
            }

            .rank {
                border-right-width: 2px;
                border-right-style: solid;
                padding: 8px 10px 8px 8px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                width: calc(20% - 18px);
            }

            .name {
                flex: 1;
                padding: 5px 8px;
                display: flex;
                align-items: center;
                width: calc(60% - 16px);

                .p {
                    font-size: 18px;
                    font-weight: bold;
                }

                &.teacher {
                    cursor: pointer;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .points {
                border-left-width: 2px;
                border-left-style: solid;
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: calc(20% - 18px);
            }
        }
    }
</style>
