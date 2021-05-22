<template>
    <base-modal ref="addAnnouncement" heading="Add Announcement">
        <template v-slot:body>
            <base-input
                type="text"
                name="label"
                label="To Do"
                placeholder="To Do"
                v-model="todo.label"
            />
            <base-input
                type="select"
                name="classColor"
                label="class"
                placeholder="class"
                v-model="todo.classColor"
            >
                <option
                    v-for="(clas, index) in classes"
                    :key="index"
                    :value="clas.color"
                    :selected="todo.classColor === clas.color"
                >
                    {{ clas.name }}
                </option>
            </base-input>
            <base-input
                type="date"
                name="date"
                label="date"
                placeholder="date"
                v-model="todo.date"
            />
        </template>
        <template v-slot:footer>
            <base-button
                type="button"
                button-type="submit"
                color="dark-orange"
                @click="addTodo"
            >
                Add
            </base-button>
        </template>
    </base-modal>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import moment from 'moment';

    export default {
        name: 'to-do-input-modal',

        data() {
            return {
                todo: {
                    id: '',
                    label: '',
                    date: moment().format('YYYY-MM-DD'),
                    classColor: '',
                    done: false,
                },
            };
        },

        computed: {
            ...mapGetters(['profile', 'classes']),
        },

        methods: {
            ...mapMutations(['setProfile']),

            ...mapActions(['updateProfile']),

            async addTodo() {
                if (!this.todo.classColor) {
                    this.todo.classColor = this.classes[0].color;
                }
                this.todo.id = this.profile.todos.length;
                const profile = this.profile;
                profile.todos.push(this.todo);
                await this.setProfile(profile);
                this.updateProfile();
                this.$refs.addAnnouncement.closeModal();
                this.reset();
            },

            openModal() {
                this.$refs.addAnnouncement.openModal();
            },

            reset() {
                this.todo = {
                    id: '',
                    label: '',
                    date: moment().format('YYYY-MM-DD'),
                    classColor: '',
                    done: false,
                };
            },
        },
    };
</script>

<style lang="scss" scoped>
    .modal {
        .base-input {
            &:not(:first-of-type) {
                margin-top: 15px;
            }

            /deep/ .input.select {
                width: 100%;
            }
        }
    }
</style>
