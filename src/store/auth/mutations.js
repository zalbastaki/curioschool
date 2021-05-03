const mutations = {
    setIsLoggedIn: (state, value) => {
        state.isLoggedIn = value;
    },

    setUserId: (state, userId) => {
        state.userId = userId;
    },

    setProfileField: (state, { field, value }) => {
        state.profile[field] = value;
    },

    setProfile: (state, profile) => {
        state.profile = profile;
    },
};

export default mutations;
