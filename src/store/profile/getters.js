const getters = {
    role: state => {
        return state.role;
    },

    profile: state => {
        return state.profile;
    },

    unsubscribeProfileListener: state => {
        return state.unsubscribeProfileListener;
    },

    todos: state => {
        if (!state.profile.todos) {
            return;
        }

        return state.profile.todos.filter(todo => {
            const today = new Date().setHours(0, 0, 0, 0);
            const date = todo.date.toDate().setHours(0, 0, 0, 0);
            return date === today;
        });
    },

    lateTodos: state => {
        if (!state.profile.todos) {
            return;
        }

        return state.profile.todos.filter(todo => {
            const today = new Date().setHours(0, 0, 0, 0);
            const date = todo.date.toDate().setHours(0, 0, 0, 0);
            return date < today && !todo.done;
        });
    },
};

export default getters;
