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
};

export default mutations;
