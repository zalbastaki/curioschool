import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

import Login from '../views/Login.vue';
import StudentHome from '../views/student/StudentHome';
import TeacherHome from '../views/teacher/TeacherHome';
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
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/teacher-home',
        name: 'teacher-home',
        component: TeacherHome,
        meta: {
            requiresAuth: true,
        },
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

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !(await firebase.getCurrentUser())) {
        alert('You must be logged in to see this page.');
        next('/');
    } else {
        next();
    }
});

export default router;
