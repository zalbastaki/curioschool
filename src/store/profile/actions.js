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
        await firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then(doc => {
                context.commit('setProfile', doc.data()['profile']);
            });

        var unsubscribe = firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(doc => {
                context.commit('setProfile', doc.data()['profile']);
            });
        context.commit('setUnsubscribeProfileListener', unsubscribe);
    },

    removeProfileListener(context) {
        context.getters.unsubscribeProfileListener();
    },

    async getUserData(context) {
        await context.dispatch('getRole');
        await context.dispatch('addProfileListener');
        await context.dispatch('addUserClassListeners');
    },

    async resetUserData(context) {
        await context.commit('setRole', '');
        await context.commit('setProfile', {});
        await context.commit('setClasses', []);
        await context.dispatch('removeProfileListener');
        await context.dispatch('removeUserClassListeners');
    },

    async updateProfile(context) {
        await firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                id: firebase.auth().currentUser.uid,
                role: context.getters.role,
                profile: context.getters.profile,
            })
            .catch(e => {
                throw e;
            });
    },

    async editTodoDoneValue(context, { id, value }) {
        await context.commit('setTodoDoneValue', { id, value });
        await context.dispatch('updateProfile');
    },

    async buyReward(context, reward) {
        let profile = context.getters.profile;
        profile.coins = Math.max(0, profile.coins - reward.price);
        profile.rewards.push(reward);

        await context.commit('setProfile', profile);
        await context.dispatch('updateProfile');
    },
};

export default actions;
