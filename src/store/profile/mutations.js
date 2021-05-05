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
};

export default mutations;
