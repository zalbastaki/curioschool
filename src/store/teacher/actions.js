import firebase from 'firebase';
import router from '../../router';

const actions = {
    addTeacherStudentListeners(context) {
        context.getters.profile.classes.forEach(classId => {
            firebase
                .firestore()
                .collection('classes')
                .doc(classId)
                .get()
                .then(async doc => {
                    const clas = doc.data();
                    clas.students.forEach(({ id }) => {
                        var unsubscribe = firebase
                            .firestore()
                            .collection('users')
                            .doc(id)
                            .onSnapshot(async doc => {
                                await context.commit(
                                    'setTeacherStudent',
                                    doc.data()
                                );
                                context.dispatch('updateCurrentStudents');
                                context.dispatch('updateCurrentSubmissions');
                                // Update currentSubmissions
                            });
                        context.commit(
                            'addUnsubscribeTeacherStudentListener',
                            unsubscribe
                        );
                    });
                });
        });
    },

    removeTeacherStudentListeners(context) {
        const unsubscribeTeacherStudentListeners = [
            ...context.getters.unsubscribeTeacherStudentListeners,
        ];
        unsubscribeTeacherStudentListeners.map((unsubscribe, index) => {
            unsubscribe();
            context.commit('removeUnsubscribeTeacherStudentListener', index);
        });
    },

    updateCurrentStudents(context) {
        const currentStudents = context.getters.students.filter(
            ({ profile }) => {
                return profile.classes.find(classId => {
                    return classId === router.currentRoute.params.id;
                });
            }
        );
        if (!currentStudents) return;

        context.commit('setCurrentStudents', currentStudents);
    },

    updateCurrentSubmissions(context) {
        let currentSubmissions = [];

        context.getters.students.forEach(student => {
            const submissions = student.profile.submissions.filter(
                ({ assessmentId }) => {
                    return (
                        assessmentId === parseInt(router.currentRoute.params.id)
                    );
                }
            );

            submissions.forEach(submission => {
                submission.student = student;
            });

            currentSubmissions.push(...submissions);
        });
        if (!currentSubmissions) return;

        context.commit('setCurrentSubmissions', currentSubmissions);
    },

    addStudentGrade(context, { studentId, submissionId, data }) {
        firebase
            .firestore()
            .collection('users')
            .doc(studentId)
            .get()
            .then(doc => {
                let student = doc.data();
                student.profile.coins =
                    parseInt(student.profile.coins) + parseInt(data.coins);
                student.profile.points =
                    parseInt(student.profile.points) + parseInt(data.points);
                let index = student.profile.submissions.findIndex(
                    ({ id }) => id === submissionId
                );
                student.profile.submissions[index].grade = data.grade;
                student.profile.submissions[index].feedback = data.feedback;
                firebase
                    .firestore()
                    .collection('users')
                    .doc(studentId)
                    .set(student);
            });
    },
};

export default actions;
