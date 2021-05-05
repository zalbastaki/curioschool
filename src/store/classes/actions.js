import firebase from 'firebase';

const actions = {
    addUserClassListeners(context) {
        context.getters.profile.classes.forEach(classId => {
            var unsubscribe = firebase
                .firestore()
                .collection('classes')
                .doc(classId)
                .onSnapshot(doc => {
                    context.commit('setClass', doc.data());
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
};

export default actions;
