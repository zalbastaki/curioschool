import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

import Login from '../views/Login.vue';
import StudentHome from '../views/student/StudentHome';
import StudentClass from '../views/student/StudentClass';
import StudentAssessments from '../views/student/StudentAssessments';
import StudentRewards from '../views/student/StudentRewards';
import AdminHome from '../views/admin/AdminHome';
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
            role: 'student',
        },
    },
    {
        path: '/student-class/:id',
        name: 'student-class',
        component: StudentClass,
        props: true,
        meta: {
            requiresAuth: true,
            role: 'student',
        },
    },
    {
        path: '/student-assessments/:id/:type',
        name: 'student-assessments',
        component: StudentAssessments,
        props: true,
        meta: {
            requiresAuth: true,
            role: 'student',
        },
    },
    {
        path: '/student-rewards',
        name: 'student-rewards',
        component: StudentRewards,
        meta: {
            requiresAuth: true,
            role: 'student',
        },
    },
    {
        path: '/admin-home',
        name: 'admin-home',
        component: AdminHome,
        meta: {
            requiresAuth: true,
            role: 'admin',
        },
    },
    {
        path: '/teacher-home',
        name: 'teacher-home',
        component: TeacherHome,
        meta: {
            requiresAuth: true,
            role: 'teacher',
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
    const requiresRole = to.matched.some(record => record.meta.role);
    const role = to.matched.find(record => record.meta.role);
    const user = await firebase.getCurrentUser();
    if (requiresAuth && !user.user) {
        alert('You must be logged in to see this page.');
        next('/');
    } else if (
        requiresAuth &&
        user.user &&
        requiresRole &&
        role.meta.role !== user.role
    ) {
        alert(`You must be a ${role.meta.role} to see this page.`);
        next(`/${user.role}-home`);
    } else {
        next();
    }
});

export default router;
