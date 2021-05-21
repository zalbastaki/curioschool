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
                    <div
                        v-for="(teacher, index) in currentAdminTeachers"
                        :key="index"
                        class="teacher-container"
                    >
                        <router-link
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
                        <button
                            class="delete-btn"
                            type="button"
                            @click.stop="deleteTeacher(teacher.id)"
                        >
                            <fa-icon
                                :icon="['fas', 'trash-alt']"
                                aria-label="delete"
                            />
                        </button>
                    </div>
                </section>
            </template>
            <base-button type="button" @click="openAddModal" width="500px">
                + Add Teacher Record
            </base-button>
            <base-modal ref="addTeacher" heading="Teacher's Firebase UID">
                <template v-slot:body>
                    <base-input
                        type="text"
                        name="uid"
                        id="uid"
                        placeholder="Firebase uid"
                        v-model="uid"
                    />
                    <div class="msg">
                        Register a user in the firebase console and copy their
                        uid here.
                    </div>
                </template>
                <template v-slot:footer>
                    <base-button
                        type="button"
                        button-type="submit"
                        color="dark-orange"
                        @click="addTeacher"
                    >
                        Add
                    </base-button>
                </template>
            </base-modal>
            <base-modal ref="error" heading="Oops!" />
        </div>
    </base-dashboard>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'admin-teachers',

        data() {
            return {
                uid: '',
            };
        },

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
                'addTeacherDoc',
                'deleteRecord',
            ]),

            openAddModal() {
                this.$refs.addTeacher.openModal();
            },

            addTeacher() {
                this.addTeacherDoc(this.uid)
                    .then(() => {
                        this.$refs.addTeacher.closeModal();
                        this.$router.push(`/admin-teacher/${this.uid}`);
                    })
                    .catch(e => {
                        this.$refs.addTeacher.closeModal();
                        this.$refs.error.openModal(e.message);
                    });
            },

            deleteTeacher(id) {
                this.deleteRecord({ collection: 'users', id }).then(() => {
                    this.$router.go();
                });
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

            .teacher-container {
                position: relative;

                .delete-btn {
                    cursor: pointer;
                    position: absolute;
                    top: 7px;
                    right: 5px;
                    background: none;
                    border: none;
                    font-size: 16px;
                    color: $black;

                    &:hover {
                        color: $dark-orange;
                    }
                }
            }

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
                height: calc(100% - 46px);

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

        .modal {
            .msg {
                font-weight: bold;
                text-align: center;
                margin-top: 5px;
            }

            .button {
                margin-top: 0;
            }
        }
    }
</style>
