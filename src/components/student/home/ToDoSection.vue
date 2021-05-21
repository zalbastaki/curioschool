<template>
    <base-section class="todos" heading="Today's plan">
        <base-text
            v-if="
                lateTodos &&
                    lateTodos.length === 0 &&
                    todos &&
                    todos.length === 0
            "
            type="p"
        >
            You've got no tasks to do today!
        </base-text>
        <base-input
            v-for="(todo, index) in todos"
            :key="`todo-${index}`"
            class="todo"
            type="checkbox"
            :name="`todo-${index}`"
            :label="todo.label"
            :value="todos[index].done"
            @input="value => editTodoDoneValue({ id: todo.id, value })"
            :style="style(todo.classColor)"
        />
        <base-text
            v-if="lateTodos && lateTodos.length > 0"
            type="h5"
            :style="todos && todos.length > 0 ? { marginTop: '20px' } : ''"
        >
            Late:
        </base-text>
        <base-input
            v-for="(todo, index) in lateTodos"
            :key="`lateTodo-${index}`"
            class="todo"
            type="checkbox"
            :name="`lateTodo-${index}`"
            :label="todo.label"
            :value="lateTodos[index].done"
            @input="value => editTodoDoneValue({ id: todo.id, value })"
            :style="todo.classColor ? style(todo.classColor) : ''"
        />
        <template v-if="role === 'teacher'">
            <base-button
                type="button"
                button-type="button"
                color="yellow"
                class="add-btn"
                height="40px"
                width="100%"
                @click="openAddModal"
            >
                Add a todo
            </base-button>
            <to-do-input-modal ref="addModal" />
        </template>
    </base-section>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ToDoInputModal from '../../teacher/home/ToDoInputModal';

    export default {
        name: 'to-do-section',

        components: {
            ToDoInputModal,
        },

        computed: {
            ...mapGetters(['todos', 'lateTodos', 'role']),
        },

        methods: {
            ...mapActions(['editTodoDoneValue']),

            style(color) {
                return {
                    background: `${color}44`,
                    border: `2px solid ${color}`,
                };
            },

            openAddModal() {
                this.$refs.addModal.openModal();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .todos {
        .todo {
            margin: 8px 0;
            padding: 5px;
            border-radius: 10px;
        }

        .base-input {
            /deep/ .checkbox-label {
                &.done {
                    text-decoration: line-through;
                }
            }
        }

        .add-btn {
            font-size: 16px;
            text-transform: none;
            margin-top: 10px;
        }
    }
</style>
