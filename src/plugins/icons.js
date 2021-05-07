import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default () => {
    library.add(faTimes);
    library.add(faCoins);

    Vue.component('fa-icon', FontAwesomeIcon);
};
