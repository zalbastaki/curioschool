import firebase from 'firebase';

const actions = {
    async login(context, user) {
        await firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(async () => {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(user.email, user.password)
                    .then(() => {
                        const uid = firebase.auth().currentUser.uid;
                        context.commit('setIsLoggedIn', true);
                        context.commit('setUserId', uid);
                        context.dispatch('getRole', { root: true });
                        context.dispatch('addProfileListener', { root: true });
                    })
                    .catch(e => {
                        throw e;
                    });
            })
            .catch(e => {
                throw e;
            });
    },

    async sendPasswordResetEmail(context, email) {
        await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .catch(e => {
                throw e;
            });
    },
};

export default actions;
