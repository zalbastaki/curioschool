const mutations = {
    setIsLoggedIn: (state, value) => {
        state.isLoggedIn = value;
    },

    setUserId: (state, userId) => {
        state.userId = userId;
    },
};

export default mutations;
