<template>
    <dashboard-section class="todos" heading="Today's plan">
        <base-input
            v-for="(todo, index) in profile.todos"
            :key="index"
            class="todo"
            type="checkbox"
            :name="`todo-${index}`"
            :label="todo.label"
            :value="profile.todos[index].done"
            @input="value => editTodoDoneValue({ index, value })"
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
            ...mapGetters(['profile']),
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
    .todos {
        .todo {
            margin: 8px 0;
            padding: 5px;
            border-radius: 10px;
            border: 2px solid $white;
        }
    }
</style>
