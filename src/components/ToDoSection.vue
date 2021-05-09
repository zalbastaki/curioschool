<template>
    <dashboard-section class="todos" heading="Today's plan">
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
    </dashboard-section>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import DashboardSection from './DashboardSection';

    export default {
        name: 'to-do-section',

        components: {
            DashboardSection,
        },

        computed: {
            ...mapGetters(['todos', 'lateTodos']),
        },

        methods: {
            ...mapActions(['editTodoDoneValue']),

            style(color) {
                return {
                    background: `${color}44`,
                    border: `2px solid ${color}`,
                };
            },
        },
    };
</script>

<style lang="scss" scoped>
    .todo {
        margin: 8px 0;
        padding: 5px;
        border-radius: 10px;
    }
</style>
