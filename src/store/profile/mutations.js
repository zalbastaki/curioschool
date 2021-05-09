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

    setTodoDoneValue: (state, { index, value }) => {
        state.profile.todos[index].done = value;
    },
};

export default mutations;
