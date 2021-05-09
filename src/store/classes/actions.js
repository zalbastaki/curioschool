import firebase from 'firebase';

const actions = {
    addUserClassListeners(context) {
        context.getters.profile.classes.forEach(classId => {
            var unsubscribe = firebase
                .firestore()
                .collection('classes')
                .doc(classId)
                .onSnapshot(async doc => {
                    await context.commit('setClass', doc.data());
                    context.dispatch('getSchedule');
                });
            context.commit('addUnsubscribeClassListener', unsubscribe);
        });
    },

    removeUserClassListeners(context) {
        const unsubscribeClassListeners = [
            ...context.getters.unsubscribeClassListeners,
        ];
        unsubscribeClassListeners.map((unsubscribe, index) => {
            unsubscribe();
            context.commit('removeUnsubscribeClassListener', index);
        });
    },

    getSchedule(context) {
        let schedule = [];
        const classes = [...context.getters.classes];

        classes.forEach(clas => {
            const times = [...clas.times];

            times.forEach(time => {
                const today = new Date();
                const date = time.start_time.toDate();

                if (
                    today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) ||
                    time.repeats === 'daily' ||
                    (time.repeats === 'weekly' &&
                        today.getDay() === date.getDay()) ||
                    (time.repeats === 'monthly' &&
                        today.getDate() === date.getDate())
                ) {
                    schedule.push({
                        class: clas.name,
                        color: clas.color,
                        start_time: time.start_time.toDate(),
                        end_time: time.end_time.toDate(),
                    });
                }
            });
        });

        context.commit('setSchedule', schedule);
    },
};

export default actions;
