import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueMq from 'vue-mq';
import icons from './plugins/icons';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAHbbLH4UEHXEwnzTkNCWHb_e58VZbLXlI',
    projectId: 'curioschool-bh',
    appId: '1:1049108034416:web:fc9c41bf7089196828d5b5',
};

firebase.initializeApp(firebaseConfig);

Vue.use(icons);

Vue.use(VueMq, {
    breakpoints: {
        mobile: 700,
        tablet: 1100,
        desktop: Infinity,
    },
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: function(h) {
        return h(App);
    },
}).$mount('#app');
