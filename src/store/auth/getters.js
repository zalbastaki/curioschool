const getters = {
    isLoggedIn: state => {
        return state.isLoggedIn;
    },

    userId: state => {
        return state.userId;
    },

    profile: state => {
        return state.profile;
    },
};

export default getters;
