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
            @click="openStudentModal"
        >
            <div
                class="rank"
                :style="{ background: `${color}44`, borderColor: color }"
            >
                {{ index + 1 }}
            </div>
            <base-text class="name" type="p">
                {{ student.first_name }} {{ student.last_name }}
            </base-text>
            <div class="points" :style="{ borderColor: color }">
                {{ student.points }}
            </div>
        </div>
    </base-section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'leaderboard-section',

        computed: {
            ...mapGetters(['currentClass', 'role', 'currentStudents']),

            leaderboard() {
                const students = this.currentClass.students;

                return students.sort((a, b) => {
                    return b.points - a.points;
                });
            },

            color() {
                return this.currentClass.color;
            },
        },

        methods: {
            openStudentModal() {
                // TO DO
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
            border-bottom-width: 2px;
            border-bottom-style: solid;
            display: flex;
            justify-content: space-between;
            cursor: pointer;

            .rank {
                border-right-width: 2px;
                border-right-style: solid;
                padding: 8px 10px 8px 8px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .name {
                flex: 1;
                padding: 5px 8px;
                font-size: 18px;
                font-weight: bold;
                display: flex;
                align-items: center;
            }

            .points {
                border-left-width: 2px;
                border-left-style: solid;
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>
