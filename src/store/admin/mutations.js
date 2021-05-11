const mutations = {
    setAdminStudents: (state, students) => {
        state.admin_students = students;
    },

    setAdminTeachers: (state, teachers) => {
        state.admin_teachers = teachers;
    },

    setAdminClasses: (state, classes) => {
        state.admin_classes = classes;
    },

    setDoc: (state, { varName, newDoc }) => {
        let exists = false;

        // If the class exists, replace it
        state[varName].map((doc, index) => {
            if (doc.id === newDoc.id) {
                exists = true;
                return (state[varName][index] = newDoc);
            }
        });

        // If the class doesn't exist, add it
        if (!exists) {
            state[varName].push(newDoc);
        }
    },

    addUnsubscribeCollectionListener: (state, unsubscribe) => {
        state.unsubscribeCollectionListeners.push(unsubscribe);
    },

    removeUnsubscribeCollectionListener: (state, index) => {
        state.unsubscribeCollectionListeners.splice(index, 1);
    },
};

export default mutations;
