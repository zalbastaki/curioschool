const mutations = {
    setTeacherStudents: (state, students) => {
        state.students = students;
    },

    setTeacherStudent: (state, newData) => {
        let exists = false;

        // If the student exists, replace it
        state.students.map((student, index) => {
            if (student.id === newData.id) {
                exists = true;
                return (state.students[index] = newData);
            }
        });

        // If the student doesn't exist, add it
        if (!exists) {
            state.students.push(newData);
        }
    },

    addUnsubscribeTeacherStudentListener: (state, unsubscribe) => {
        state.unsubscribeTeacherStudentListeners.push(unsubscribe);
    },

    removeUnsubscribeTeacherStudentListener: (state, index) => {
        state.unsubscribeTeacherStudentListeners.splice(index, 1);
    },

    setCurrentStudents: (state, currentStudents) => {
        state.currentStudents = currentStudents;
    },

    setCurrentSubmissions: (state, currentSubmissions) => {
        state.currentSubmissions = currentSubmissions;
    },
};

export default mutations;
