<template>
    <base-dashboard color="yellow">
        <base-loader :show="!currentAdminStudent" />
        <div v-if="currentAdminStudent" class="admin-student">
            <router-link class="back-btn" :to="`/admin-students`">
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </router-link>
            <base-text type="h3">{{ name }}</base-text>
            <form @submit.prevent="handleSubmit">
                <base-input
                    type="text"
                    name="first_name"
                    id="first_name"
                    label="first name"
                    placeholder="first name"
                    v-model="currentAdminStudent.profile.first_name"
                />
                <base-input
                    type="text"
                    name="last_name"
                    label="last name"
                    placeholder="last name"
                    v-model="currentAdminStudent.profile.last_name"
                />
                <base-input
                    type="select"
                    name="level"
                    label="level"
                    placeholder="level"
                    v-model="currentAdminStudent.profile.level"
                >
                    <option
                        v-for="(level, index) in levels"
                        :key="index"
                        :value="level"
                        :selected="level === currentAdminStudent.profile.level"
                    >
                        {{ level }}
                    </option>
                </base-input>
                <base-multi-select
                    :value="classes"
                    @input="handleClassInput"
                    :options="classOptions"
                    :customLabel="({ name }) => name"
                    track-by="id"
                    input-label="classes"
                    class="classes-input"
                />
                <base-input
                    type="number"
                    name="coins"
                    label="coins"
                    placeholder="coins"
                    v-model="currentAdminStudent.profile.coins"
                />
                <base-input
                    type="number"
                    name="points"
                    label="points"
                    placeholder="points"
                    v-model="currentAdminStudent.profile.points"
                />
                <reward-input
                    v-for="(reward, index) in currentAdminStudent.profile
                        .rewards"
                    :key="`reward-${index}`"
                    v-model="currentAdminStudent.profile.rewards[index]"
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
                <to-do-input
                    v-for="(todo, index) in currentAdminStudent.profile.todos"
                    :key="`todo-${index}`"
                    v-model="currentAdminStudent.profile.todos[index]"
                    @delete="deleteToDo(index)"
                />
                <base-button
                    type="button"
                    button-type="button"
                    width="100%"
                    height="30px"
                    class="add-btn"
                    @click="addToDo"
                >
                    + Add a to-do
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
    import { mapGetters, mapActions } from 'vuex';
    import RewardInput from '../../components/admin/RewardInput';
    import ToDoInput from '../../components/admin/ToDoInput';

    export default {
        name: 'admin-student',

        components: {
            RewardInput,
            ToDoInput,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        computed: {
            ...mapGetters(['currentAdminStudent', 'adminClasses', 'levels']),

            name() {
                const student = this.currentAdminStudent.profile;
                return `${student.first_name} ${student.last_name}`;
            },

            classes() {
                return this.currentAdminStudent.profile.classes.map(clas => {
                    return this.adminClasses.find(({ id }) => id === clas);
                });
            },

            classOptions() {
                return this.adminClasses.filter(({ level }) => {
                    return level === this.currentAdminStudent.profile.level;
                });
            },
        },

        mounted() {
            this.updateCurrentAdminStudent();
        },

        methods: {
            ...mapActions(['updateCurrentAdminStudent', 'updateStudentDoc']),

            handleClassInput(value) {
                const classes = value.map(({ id }) => id);
                this.currentAdminStudent.profile.classes = [...classes];
            },

            addReward() {
                this.currentAdminStudent.profile.rewards.push({
                    class: {
                        id: this.adminClasses[0].id,
                        name: this.adminClasses[0].name,
                        color: this.adminClasses[0].color,
                    },
                    label: '',
                    price: 0,
                });
            },

            deleteReward(index) {
                this.currentAdminStudent.profile.rewards.splice(index, 1);
            },

            addToDo() {
                this.currentAdminStudent.profile.todos.push({
                    id: this.currentAdminStudent.profile.todos.length,
                    label: '',
                    classColor: this.adminClasses[0].color,
                    date: new Date(),
                    done: false,
                });
            },

            deleteToDo(index) {
                this.currentAdminStudent.profile.todos.splice(index, 1);
            },

            handleSubmit() {
                this.updateStudentDoc().then(() => {
                    this.$refs.saveSuccess.openModal();
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .admin-student {
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

        .classes-input {
            margin-top: 15px;
        }

        .add-btn {
            margin-top: 15px;
            font-size: 18px;
            text-transform: none;
        }
    }
</style>
