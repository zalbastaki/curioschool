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

    adminLevelSelected: state => {
        return state.adminLevelSelected;
    },

    currentAdminStudents: state => {
        return state.currentAdminStudents;
    },

    currentAdminStudent: state => {
        return state.currentAdminStudent;
    },
};

export default getters;
