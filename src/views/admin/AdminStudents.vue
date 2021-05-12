<template>
    <base-dashboard color="yellow">
        <base-loader :show="currentAdminStudents.length === 0" />
        <div v-if="currentAdminStudents.length > 0" class="admin-students">
            <div class="top-bar">
                <base-text type="h2">Students</base-text>
                <select
                    v-if="currentAdminStudents.length > 0"
                    v-model="selectedLevel"
                    class="level-select"
                    name="levels"
                    id="levels"
                >
                    <option value="all">all</option>
                    <option
                        v-for="(level, index) in levels"
                        :key="index"
                        :value="level"
                    >
                        {{ level }}
                    </option>
                </select>
            </div>
            <base-text v-if="currentAdminStudents.length === 0" type="p">
                There are currently no students registered!
            </base-text>
            <template v-else>
                <section class="students">
                    <router-link
                        v-for="(student, index) in currentAdminStudents"
                        :key="index"
                        class="student"
                        :to="`/admin-student/${student.id}`"
                    >
                        <div class="avatar" />
                        <base-text type="p">
                            {{
                                student.profile.first_name +
                                    ' ' +
                                    student.profile.last_name
                            }}
                        </base-text>
                    </router-link>
                </section>
            </template>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'admin-students',

        computed: {
            ...mapGetters([
                'adminStudents',
                'adminLevelSelected',
                'currentAdminStudents',
            ]),

            levels() {
                let levels = [];

                this.adminStudents.forEach(({ profile }) => {
                    const exists = levels.find(
                        level => level === profile.level
                    );

                    if (exists) {
                        return;
                    }

                    return levels.push(profile.level);
                });

                return levels;
            },

            selectedLevel: {
                get() {
                    return this.adminLevelSelected;
                },

                set(val) {
                    this.updateAdminStudentLevelSelected(val);
                },
            },
        },

        mounted() {
            this.updateCurrentAdminStudents();
        },

        methods: {
            ...mapActions([
                'updateCurrentAdminStudents',
                'updateAdminStudentLevelSelected',
            ]),
        },
    };
</script>

<style lang="scss" scoped>
    .admin-students {
        display: flex;
        flex-direction: column;

        .top-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .level-select {
            align-self: flex-end;
            text-transform: capitalize;
            font-size: 20px;
            font-weight: bold;
            color: $white;
            padding: 10px 10px 10px 15px;
            border: none;
            border-radius: 18px;
            background: $purple;
            box-shadow: 3px 3px darken($purple, 10%);

            &:hover {
                cursor: pointer;
            }
        }

        .students {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;

            .student {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px 10px;
                border: 3px solid $orange;
                border-radius: $border-radius;
                background: lighten($orange, 25%);
                font-weight: bold;
                text-align: center;
                color: $black;
                text-decoration: none;

                .avatar {
                    width: 100px;
                    height: 100px;
                    border: 3px solid $orange;
                    border-radius: 50%;
                    background-image: url('../../assets/images/placeholder-avatar.png');
                    background-size: cover;
                    margin-bottom: 10px;
                }

                .p {
                    font-size: 18px;
                }

                &:hover {
                    background: lighten($orange, 15%);
                }
            }
        }
    }
</style>
