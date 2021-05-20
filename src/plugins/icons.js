import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTimes,
    faCoins,
    faHome,
    faChalkboardTeacher,
    faProjectDiagram,
    faFileAlt,
    faStickyNote,
    faArrowLeft,
    faClock,
    faTrashAlt,
    faCalendarDay,
    faClipboard,
    faBalanceScaleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default () => {
    library.add(faTimes);
    library.add(faCoins);
    library.add(faHome);
    library.add(faChalkboardTeacher);
    library.add(faProjectDiagram);
    library.add(faFileAlt);
    library.add(faStickyNote);
    library.add(faArrowLeft);
    library.add(faClock);
    library.add(faTrashAlt);
    library.add(faCalendarDay);
    library.add(faClipboard);
    library.add(faBalanceScaleRight);

    Vue.component('fa-icon', FontAwesomeIcon);
};
