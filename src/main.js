import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';

import VueMq from 'vue-mq';
import icons from './plugins/icons';
import firebase from 'firebase';

// Initialize firebase
const firebaseConfig = {
    apiKey: 'AIzaSyAHbbLH4UEHXEwnzTkNCWHb_e58VZbLXlI',
    projectId: 'curioschool-bh',
    appId: '1:1049108034416:web:fc9c41bf7089196828d5b5',
};

firebase.initializeApp(firebaseConfig);

// Initialize icons plugin
Vue.use(icons);

// Initialize VueMq plugin
Vue.use(VueMq, {
    breakpoints: {
        mobile: 700,
        tablet: 1100,
        desktop: Infinity,
    },
});

// Register base components globally
const requireComponent = require.context(
    // The relative path of the components folder
    './components',
    // Whether or not to look in subfolders
    true,
    // The regular expression used to match base component filenames
    /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
    // Get component config
    const componentConfig = requireComponent(fileName);

    // Get PascalCase name of component
    const componentName = upperFirst(
        camelCase(
            // Gets the file name regardless of folder depth
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    );

    // Register component globally
    Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: function(h) {
        return h(App);
    },
}).$mount('#app');
