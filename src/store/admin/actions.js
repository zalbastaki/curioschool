import firebase from 'firebase';

const actions = {
    addCollectionListener(context, collection) {
        var unsubscribe = firebase
            .firestore()
            .collection(collection)
            .onSnapshot(data => {
                data.docs.forEach(doc => {
                    if (
                        collection === 'users' &&
                        doc.data()['role'] === 'admin'
                    ) {
                        return;
                    }

                    let varName = `admin_${collection}`;

                    if (collection === 'users') {
                        const role = doc.data()['role'];
                        varName = `admin_${role}s`;
                    }

                    context.commit('setDoc', {
                        varName,
                        newDoc: doc.data(),
                    });
                });
            });
        context.commit('addUnsubscribeCollectionListener', unsubscribe);
    },

    removeCollectionListeners(context) {
        const unsubscribeCollectionListeners = [
            ...context.getters.unsubscribeCollectionListeners,
        ];
        unsubscribeCollectionListeners.map((unsubscribe, index) => {
            unsubscribe();
            context.commit('removeUnsubscribeCollectionListener', index);
        });
    },

    getAdminData(context) {
        context.dispatch('addCollectionListener', 'users');
        context.dispatch('addCollectionListener', 'classes');
    },

    resetAdminData(context) {
        context.dispatch('removeCollectionListeners');
        context.commit('setAdminStudents', []);
        context.commit('setAdminTeachers', []);
        context.commit('setAdminClasses', []);
    },
};

export default actions;
