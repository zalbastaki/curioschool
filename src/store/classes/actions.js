import firebase from 'firebase';
import router from '../../router';

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
                    context.dispatch('updateCurrentClass');
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
                let date = new Date(time.start_time);
                if (isNaN(date)) date = time.start_time.toDate();

                if (
                    today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) ||
                    time.repeats === 'daily' ||
                    (time.repeats === 'weekly' &&
                        today.getDay() === date.getDay()) ||
                    (time.repeats === 'monthly' &&
                        today.getDate() === date.getDate())
                ) {
                    let start_time = new Date(time.start_time);
                    if (isNaN(start_time))
                        start_time = time.start_time.toDate();

                    let end_time = new Date(time.end_time);
                    if (isNaN(end_time)) end_time = time.end_time.toDate();

                    schedule.push({
                        class: clas.name,
                        color: clas.color,
                        start_time,
                        end_time,
                    });
                }
            });
        });

        context.commit('setSchedule', schedule);
    },

    updateCurrentClass(context) {
        const currentClass = context.getters.classes.find(
            ({ id }) => id === router.currentRoute.params.id
        );
        if (!currentClass) return;
        currentClass.announcements.sort((a, b) => {
            let date_a = new Date(a.timestamp);
            if (isNaN(date_a)) date_a = a.timestamp.toDate();
            let date_b = new Date(b.timestamp);
            if (isNaN(date_b)) date_b = b.timestamp.toDate();

            return date_b - date_a;
        });
        context.commit('setCurrentClass', currentClass);
    },
};

export default actions;
