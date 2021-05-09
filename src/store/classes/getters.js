const getters = {
    classes: state => {
        return state.classes;
    },

    unsubscribeClassListeners: state => {
        return state.unsubscribeClassListeners;
    },

    schedule: state => {
        return state.schedule;
    },
};

export default getters;
