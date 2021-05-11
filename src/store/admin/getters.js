const getters = {
    adminUsers: state => {
        return state.admin_users;
    },

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
};

export default getters;
