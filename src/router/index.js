import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Login.vue';
import StudentHome from '../views/student/StudentHome';
import PageNotFound from '../views/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/student-home',
        name: 'student-home',
        component: StudentHome,
    },
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
