import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default () => {
    library.add(faTimes);

    Vue.component('fa-icon', FontAwesomeIcon);
};
