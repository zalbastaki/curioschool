<template>
    <base-dashboard color="yellow">
        <base-loader :show="!currentAdminTeachers" />
        <div v-if="currentAdminTeachers" class="admin-teachers">
            <div class="top-bar">
                <base-text type="h2">Teachers</base-text>
                <select
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
            <base-text v-if="currentAdminTeachers.length === 0" type="p">
                There are currently no teachers registered!
            </base-text>
            <template v-else>
                <section class="teachers">
                    <router-link
                        v-for="(teacher, index) in currentAdminTeachers"
                        :key="index"
                        class="teacher"
                        :to="`/admin-teacher/${teacher.id}`"
                    >
                        <div class="avatar" />
                        <base-text type="p">
                            {{
                                teacher.profile.first_name +
                                    ' ' +
                                    teacher.profile.last_name
                            }}
                        </base-text>
                    </router-link>
                </section>
            </template>
            <base-button type="button" @click="addTeacher" width="300px">
                + Add Teacher
            </base-button>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'admin-teachers',

        computed: {
            ...mapGetters([
                'adminTeachers',
                'adminLevelSelected',
                'currentAdminTeachers',
                'levels',
            ]),

            selectedLevel: {
                get() {
                    return this.adminLevelSelected;
                },

                set(val) {
                    this.updateAdminLevelSelected(val);
                },
            },
        },

        mounted() {
            this.updateCurrentAdminTeachers();
        },

        methods: {
            ...mapActions([
                'updateCurrentAdminTeachers',
                'updateAdminLevelSelected',
            ]),

            addTeacher() {
                // TO DO
            },
        },
    };
</script>

<style lang="scss" scoped>
    .admin-teachers {
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

        .teachers {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;

            .teacher {
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

        .button {
            margin-top: 20px;
            align-self: center;
        }
    }
</style>
