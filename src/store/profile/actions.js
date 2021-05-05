import firebase from 'firebase';

const actions = {
    async getRole(context) {
        await firebase
            .firestore()
            .collection('users')
            .doc(context.rootGetters.userId)
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
        await firebase
            .firestore()
            .collection('users')
            .doc(context.rootGetters.userId)
            .onSnapshot(doc => {
                context.commit('setProfile', doc.data()['profile']);
            });
    },
};

export default actions;
