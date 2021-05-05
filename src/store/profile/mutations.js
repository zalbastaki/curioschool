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

    setUnsubscribe: (state, unsubscribe) => {
        state.unsubscribe = unsubscribe;
    },
};

export default mutations;
