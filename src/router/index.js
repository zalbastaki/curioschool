import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

import Login from '../views/Login.vue';
import StudentHome from '../views/student/StudentHome';
import StudentClass from '../views/student/StudentClass';
import StudentAssessments from '../views/student/StudentAssessments';
import StudentRewards from '../views/student/StudentRewards';
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
        path: '/student-class/:id',
        name: 'student-class',
        component: StudentClass,
        props: true,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/student-assessments/:id/:type',
        name: 'student-assessments',
        component: StudentAssessments,
        props: true,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/student-rewards',
        name: 'student-rewards',
        component: StudentRewards,
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
