import firebase from 'firebase';
import router from '../../router';

const actions = {
    addCollectionListener(context, collection) {
        var unsubscribe = firebase
            .firestore()
            .collection(collection)
            .onSnapshot(async data => {
                data.docs.forEach(async doc => {
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

                    await context.commit('setDoc', {
                        varName,
                        newDoc: doc.data(),
                    });
                });
                await context.dispatch('updateCurrentAdminStudents');
                await context.dispatch('updateCurrentAdminStudent');
                await context.dispatch('getLevels');
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

    getLevels(context) {
        const students = [...context.getters.adminStudents];
        let levels = [];

        students.forEach(({ profile }) => {
            const exists = levels.find(level => level === profile.level);

            if (exists) {
                return;
            }

            return levels.push(profile.level);
        });

        context.commit('setLevels', levels);
    },

    async updateAdminStudentLevelSelected(context, selectedLevel) {
        await context.commit('setAdminLevelSelected', selectedLevel);
        context.dispatch('updateCurrentAdminStudents');
    },

    updateCurrentAdminStudents(context) {
        if (context.getters.adminLevelSelected === 'all') {
            return context.commit(
                'setCurrentAdminStudents',
                context.getters.adminStudents
            );
        }

        const currentAdminStudents = context.getters.adminStudents.filter(
            ({ profile }) => {
                return profile.level === context.getters.adminLevelSelected;
            }
        );
        context.commit('setCurrentAdminStudents', currentAdminStudents);
    },

    updateCurrentAdminStudent(context) {
        if (!router.currentRoute.params.id) {
            return;
        }

        const currentAdminStudent = context.getters.adminStudents.find(
            ({ id }) => {
                return id === router.currentRoute.params.id;
            }
        );
        context.commit('setCurrentAdminStudent', currentAdminStudent);
    },

    async updateStudentDoc(context) {
        const student = context.getters.currentAdminStudent;
        await context.commit('setCurrentAdminStudent', student);
        await firebase
            .firestore()
            .collection('users')
            .doc(student.id)
            .set(student)
            .catch(e => {
                throw e;
            });
    },
};

export default actions;
