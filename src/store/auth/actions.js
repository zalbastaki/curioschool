import firebase from 'firebase';
import router from '../../router';

const actions = {
    async login(context, user) {
        await firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(async () => {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(user.email, user.password)
                    .catch(e => {
                        throw e;
                    });
            })
            .catch(e => {
                throw e;
            });
    },

    goToDashboard(context) {
        const role = context.getters.role;
        if (role === 'student' && router.currentRoute.name !== 'student-home') {
            router.push('student-home');
        } else if (
            role === 'teacher' &&
            router.currentRoute.name !== 'teacher-home'
        ) {
            router.push('teacher-home');
        }
    },

    async sendPasswordResetEmail(context, email) {
        await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .catch(e => {
                throw e;
            });
    },

    logout() {
        firebase
            .auth()
            .signOut()
            .catch(e => {
                throw e;
            });
    },
};

export default actions;
