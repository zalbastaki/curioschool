const mutations = {
    setClasses: (state, classes) => {
        state.classes = classes;
    },

    setClass: (state, newData) => {
        let exists = false;

        // If the class exists, replace it
        state.classes.map((clas, index) => {
            if (clas.id === newData.id) {
                exists = true;
                return (state.classes[index] = newData);
            }
        });

        // If the class doesn't exist, add it
        if (!exists) {
            state.classes.push(newData);
        }
    },

    addUnsubscribeClassListener: (state, unsubscribe) => {
        state.unsubscribeClassListeners.push(unsubscribe);
    },

    removeUnsubscribeClassListener: (state, index) => {
        state.unsubscribeClassListeners.splice(index, 1);
    },

    setSchedule: (state, schedule) => {
        state.schedule = schedule;
    },
};

export default mutations;
