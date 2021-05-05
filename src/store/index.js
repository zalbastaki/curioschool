import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth/index';
import profile from './profile/index';
import classes from './classes/index';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        profile,
        classes,
    },
});
