import firebase from 'firebase';

const actions = {
    async login(context, user) {
        await firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(user.email, user.password)
                    .then(() => {
                        const uid = firebase.auth().currentUser.uid;
                        context.commit('setIsLoggedIn', true);
                        context.commit('setUserId', uid);
                    });
            })
            .catch(e => {
                console.error(e.message, e.code);
            });
    },
};

export default actions;
