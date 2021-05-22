import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth/index';
import profile from './profile/index';
import classes from './classes/index';
import admin from './admin/index';
import teacher from './teacher/index';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        profile,
        classes,
        admin,
        teacher,
    },
});
