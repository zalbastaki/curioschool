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
};

export default getters;
