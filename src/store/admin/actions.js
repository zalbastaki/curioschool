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
                await context.dispatch('updateCurrentAdminTeachers');
                await context.dispatch('updateCurrentAdminTeacher');
                await context.dispatch('updateCurrentAdminClasses');
                await context.dispatch('updateCurrentAdminClass');
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

        const teachers = [...context.getters.adminTeachers];

        teachers.forEach(({ profile }) => {
            profile.levels.forEach(level => {
                const exists = levels.find(ilevel => ilevel === level);

                if (exists) {
                    return;
                }

                return levels.push(level);
            });
        });

        levels.sort();

        context.commit('setLevels', levels);
    },

    async updateAdminLevelSelected(context, selectedLevel) {
        await context.commit('setAdminLevelSelected', selectedLevel);
        context.dispatch('updateCurrentAdminStudents');
        context.dispatch('updateCurrentAdminTeachers');
        context.dispatch('updateCurrentAdminClasses');
    },

    updateCurrentAdminStudents(context) {
        let currentAdminStudents = [];
        if (context.getters.adminLevelSelected === 'all') {
            currentAdminStudents = [...context.getters.adminStudents];
        } else {
            currentAdminStudents = context.getters.adminStudents.filter(
                ({ profile }) => {
                    return profile.level === context.getters.adminLevelSelected;
                }
            );
        }

        currentAdminStudents.sort((a, b) => {
            if (a.profile.first_name < b.profile.first_name) {
                return -1;
            }
            if (a.profile.first_name > b.profile.first_name) {
                return 1;
            }
            return 0;
        });

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

    updateCurrentAdminTeachers(context) {
        let currentAdminTeachers = [];
        if (context.getters.adminLevelSelected === 'all') {
            currentAdminTeachers = [...context.getters.adminTeachers];
        } else {
            currentAdminTeachers = context.getters.adminTeachers.filter(
                ({ profile }) => {
                    return profile.levels.find(
                        level => level === context.getters.adminLevelSelected
                    );
                }
            );
        }

        currentAdminTeachers.sort((a, b) => {
            if (a.profile.first_name < b.profile.first_name) {
                return -1;
            }
            if (a.profile.first_name > b.profile.first_name) {
                return 1;
            }
            return 0;
        });

        context.commit('setCurrentAdminTeachers', currentAdminTeachers);
    },

    updateCurrentAdminTeacher(context) {
        if (!router.currentRoute.params.id) {
            return;
        }

        const currentAdminTeacher = context.getters.adminTeachers.find(
            ({ id }) => {
                return id === router.currentRoute.params.id;
            }
        );

        context.commit('setCurrentAdminTeacher', currentAdminTeacher);
    },

    async updateTeacherDoc(context) {
        const teacher = context.getters.currentAdminTeacher;
        await context.commit('setCurrentAdminTeacher', teacher);
        await firebase
            .firestore()
            .collection('users')
            .doc(teacher.id)
            .set(teacher)
            .catch(e => {
                throw e;
            });
    },

    updateCurrentAdminClasses(context) {
        let currentAdminClasses = [];
        if (context.getters.adminLevelSelected === 'all') {
            currentAdminClasses = [...context.getters.adminClasses];
        } else {
            currentAdminClasses = context.getters.adminClasses.filter(
                ({ level }) => level === context.getters.adminLevelSelected
            );
        }

        currentAdminClasses.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        currentAdminClasses.sort((a, b) => {
            if (a.level < b.level) {
                return -1;
            }
            if (a.level > b.level) {
                return 1;
            }
            return 0;
        });

        context.commit('setCurrentAdminClasses', currentAdminClasses);
    },

    updateCurrentAdminClass(context) {
        if (!router.currentRoute.params.id) {
            return;
        }

        const currentAdminClass = context.getters.adminClasses.find(
            ({ id }) => {
                return id === router.currentRoute.params.id;
            }
        );

        context.commit('setCurrentAdminClass', currentAdminClass);
    },

    async updateClassDoc(context) {
        const clas = context.getters.currentAdminClass;
        await context.commit('setCurrentAdminClass', clas);
        await firebase
            .firestore()
            .collection('users')
            .doc(clas.id)
            .set(clas)
            .catch(e => {
                throw e;
            });
    },
};

export default actions;
