import Vue from 'vue';
import VueRouter from 'vue-router';

import UnderConstruction from '../views/UnderConstruction.vue';
// Import new pages here
import PageNotFound from '../views/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'under-construction',
        component: UnderConstruction,
    },
    // Add new routes here
    {
        path: '/*',
        name: 'page-not-found',
        component: PageNotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
