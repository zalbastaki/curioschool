const mutations = {
    setRole: (state, role) => {
        state.role = role;
    },

    setProfile: (state, profile) => {
        state.profile = profile;
    },

    setProfileField: (state, { field, value }) => {
        state.profile[field] = value;
    },

    setUnsubscribeProfileListener: (state, unsubscribe) => {
        state.unsubscribeProfileListener = unsubscribe;
    },

    setTodoDoneValue: (state, { id, value }) => {
        const index = state.profile.todos.findIndex(todo => todo.id === id);
        state.profile.todos[index].done = value;
    },
};

export default mutations;
