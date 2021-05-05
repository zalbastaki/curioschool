import firebase from 'firebase';

const actions = {
    async getRole(context) {
        await firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    context.commit('setRole', doc.data()['role']);
                } else {
                    throw new Error("Can't find user's data.");
                }
            });
    },

    async addProfileListener(context) {
        var unsubscribe = await firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(doc => {
                context.commit('setProfile', doc.data()['profile']);
            });
        context.commit('setUnsubscribe', unsubscribe);
    },

    removeProfileListener(context) {
        context.getters.unsubscribe();
    },

    async getUserData(context) {
        await context.dispatch('getRole');
        await context.dispatch('addProfileListener');
    },

    async resetUserData(context) {
        await context.commit('setRole', '');
        await context.commit('setProfile', {});
        await context.dispatch('removeProfileListener');
    },
};

export default actions;
