const getters = {
    adminStudents: state => {
        return state.admin_students;
    },

    adminTeachers: state => {
        return state.admin_teachers;
    },

    adminClasses: state => {
        return state.admin_classes;
    },

    unsubscribeCollectionListeners: state => {
        return state.unsubscribeCollectionListeners;
    },

    levels: state => {
        return state.levels;
    },

    adminLevelSelected: state => {
        return state.adminLevelSelected;
    },

    currentAdminStudents: state => {
        return state.currentAdminStudents;
    },

    currentAdminStudent: state => {
        return state.currentAdminStudent;
    },

    currentAdminTeachers: state => {
        return state.currentAdminTeachers;
    },

    currentAdminTeacher: state => {
        return state.currentAdminTeacher;
    },

    currentAdminClasses: state => {
        return state.currentAdminClasses;
    },

    currentAdminClass: state => {
        return state.currentAdminClass;
    },
};

export default getters;
