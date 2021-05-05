import firebase from 'firebase';

const actions = {
    async getProfile(context) {
        await firebase
            .firestore()
            .collection('users')
            .doc(context.rootGetters.userId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    context.commit('setRole', doc.data()['role']);
                    context.commit('setProfile', doc.data()['profile']);
                } else {
                    throw new Error("Can't find user's profile.");
                }
            });
    },
};

export default actions;
