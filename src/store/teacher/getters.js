const getters = {
    students: state => {
        return state.students;
    },

    unsubscribeTeacherStudentListeners: state => {
        return state.unsubscribeTeacherStudentListeners;
    },

    currentStudents: state => {
        return state.currentStudents;
    },

    currentSubmissions: state => {
        return state.currentSubmissions;
    },
};

export default getters;
