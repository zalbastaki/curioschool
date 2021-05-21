import firebase from 'firebase';
import router from '../../router';

const actions = {
    addUserClassListeners(context) {
        context.getters.profile.classes.forEach(classId => {
            var unsubscribe = firebase
                .firestore()
                .collection('classes')
                .doc(classId)
                .onSnapshot(async doc => {
                    await context.commit('setClass', doc.data());
                    context.dispatch('getSchedule');
                    context.dispatch('getUpcomingAssessments');
                    context.dispatch('updateCurrentClass');
                    context.dispatch('updateCurrentAssessment');
                });
            context.commit('addUnsubscribeClassListener', unsubscribe);
        });
    },

    removeUserClassListeners(context) {
        const unsubscribeClassListeners = [
            ...context.getters.unsubscribeClassListeners,
        ];
        unsubscribeClassListeners.map((unsubscribe, index) => {
            unsubscribe();
            context.commit('removeUnsubscribeClassListener', index);
        });
    },

    getSchedule(context) {
        let schedule = [];
        const classes = [...context.getters.classes];

        classes.forEach(clas => {
            const times = [...clas.times];

            times.forEach(time => {
                const today = new Date();
                let date = new Date(time.start_time);
                if (isNaN(date)) date = time.start_time.toDate();

                if (
                    today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) ||
                    time.repeats === 'daily' ||
                    (time.repeats === 'weekly' &&
                        today.getDay() === date.getDay()) ||
                    (time.repeats === 'monthly' &&
                        today.getDate() === date.getDate())
                ) {
                    let start_time = new Date(time.start_time);
                    if (isNaN(start_time))
                        start_time = time.start_time.toDate();

                    let end_time = new Date(time.end_time);
                    if (isNaN(end_time)) end_time = time.end_time.toDate();

                    schedule.push({
                        class: clas.name,
                        color: clas.color,
                        start_time,
                        end_time,
                    });
                }
            });
        });

        schedule.sort((a, b) => a.start_time - b.start_time);

        context.commit('setSchedule', schedule);
    },

    getUpcomingAssessments(context) {
        let upcomingAssessments = {
            homework: [],
            classwork: [],
            project: [],
            quiz: [],
            test: [],
        };
        const classes = [...context.getters.classes];

        classes.forEach(clas => {
            const assessments = [...clas.assessments];

            assessments.forEach(assessment => {
                let due_date = new Date(assessment.due_date);
                if (isNaN(due_date)) {
                    due_date = assessment.due_date.toDate();
                }
                const now = new Date();

                if (due_date > now) {
                    upcomingAssessments[assessment.type].push({
                        id: assessment.id,
                        classId: clas.id,
                        name: assessment.name,
                        due_date: due_date,
                        color: clas.color,
                    });
                }
            });
        });

        upcomingAssessments.homework.sort((a, b) => a.due_date - b.due_date);
        upcomingAssessments.classwork.sort((a, b) => a.due_date - b.due_date);
        upcomingAssessments.project.sort((a, b) => a.due_date - b.due_date);
        upcomingAssessments.quiz.sort((a, b) => a.due_date - b.due_date);
        upcomingAssessments.test.sort((a, b) => a.due_date - b.due_date);

        context.commit('setUpcomingAssessments', upcomingAssessments);
    },

    getCurrentClassUpcomingAssessments(context, currentClass) {
        let upcomingAssessments = {
            homework: [],
            classwork: [],
            project: [],
            quiz: [],
            test: [],
        };
        currentClass.assessments.forEach(assessment => {
            let due_date = new Date(assessment.due_date);
            if (isNaN(due_date)) {
                due_date = assessment.due_date.toDate();
            }
            const now = new Date();

            if (due_date > now) {
                upcomingAssessments[assessment.type].push(assessment);
            }
        });
        upcomingAssessments.homework.sort((a, b) => a.due_date - b.due_date);
        upcomingAssessments.classwork.sort((a, b) => a.due_date - b.due_date);
        upcomingAssessments.project.sort((a, b) => a.due_date - b.due_date);
        upcomingAssessments.quiz.sort((a, b) => a.due_date - b.due_date);
        upcomingAssessments.test.sort((a, b) => a.due_date - b.due_date);
        return upcomingAssessments;
    },

    getCurrentClassPastAssessments(context, currentClass) {
        let pastAssessments = {
            homework: [],
            classwork: [],
            project: [],
            quiz: [],
            test: [],
        };
        currentClass.assessments.forEach(assessment => {
            let due_date = new Date(assessment.due_date);
            if (isNaN(due_date)) {
                due_date = assessment.due_date.toDate();
            }
            const now = new Date();

            if (due_date < now) {
                pastAssessments[assessment.type].push(assessment);
            }
        });
        pastAssessments.homework.sort((a, b) => b.due_date - a.due_date);
        pastAssessments.classwork.sort((a, b) => b.due_date - a.due_date);
        pastAssessments.project.sort((a, b) => b.due_date - a.due_date);
        pastAssessments.quiz.sort((a, b) => b.due_date - a.due_date);
        pastAssessments.test.sort((a, b) => b.due_date - a.due_date);
        return pastAssessments;
    },

    async updateCurrentClass(context) {
        const currentClass = context.getters.classes.find(
            ({ id }) => id === router.currentRoute.params.id
        );
        if (!currentClass) return;

        // ANNOUNCEMENTS
        currentClass.announcements.sort((a, b) => {
            let date_a = new Date(a.timestamp);
            if (isNaN(date_a)) date_a = a.timestamp.toDate();
            let date_b = new Date(b.timestamp);
            if (isNaN(date_b)) date_b = b.timestamp.toDate();

            return date_b - date_a;
        });

        currentClass.upcomingAssessments = await context.dispatch(
            'getCurrentClassUpcomingAssessments',
            currentClass
        );
        currentClass.pastAssessments = await context.dispatch(
            'getCurrentClassPastAssessments',
            currentClass
        );

        context.commit('setCurrentClass', currentClass);
    },

    updateCurrentAssessment(context) {
        const currentClass = context.getters.classes.find(
            ({ id }) => id === router.currentRoute.params.classId
        );
        if (!currentClass) return;

        const currentAssessment = currentClass.assessments.find(({ id }) => {
            return parseInt(id) === parseInt(router.currentRoute.params.id);
        });
        if (!currentAssessment) return;

        currentAssessment.class = currentClass;

        currentAssessment.questions.sort((a, b) => a.order - b.order);

        if (context.getters.role === 'student') {
            currentAssessment.submissions = context.getters.profile.submissions.filter(
                submission => {
                    return submission.assessmentId === currentAssessment.id;
                }
            );
        }

        context.commit('setCurrentAssessment', currentAssessment);
    },

    async updateSubmission(context, updatedSubmission) {
        let currentAssessment = { ...context.getters.currentAssessment };
        let exists;

        updatedSubmission.assessmentId = currentAssessment.id;

        currentAssessment.submissions.forEach((submission, index) => {
            if (submission.id === updatedSubmission.id) {
                exists = true;
                currentAssessment.submissions[index] = updatedSubmission;
            }
        });

        if (!exists) {
            currentAssessment.submissions.push(updatedSubmission);
        }

        context.commit('setCurrentAssessment', currentAssessment);

        let profile = context.getters.profile;
        const otherSubmissions = profile.submissions.filter(
            ({ assessmentId }) => {
                return assessmentId !== currentAssessment.id;
            }
        );
        profile.submissions = [
            ...otherSubmissions,
            ...currentAssessment.submissions,
        ];
        await context.commit('setProfile', profile);
        await context.dispatch('updateProfile');
    },

    updateClassDoc(context, clas) {
        firebase
            .firestore()
            .collection('classes')
            .doc(clas.id)
            .set(clas)
            .catch(e => {
                throw e;
            });
    },
};

export default actions;
