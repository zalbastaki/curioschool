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

    currentClass: state => {
        return state.currentClass;
    },
};

export default getters;
