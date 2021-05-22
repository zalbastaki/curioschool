import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

import Login from '../views/Login.vue';
import StudentHome from '../views/student/StudentHome';
import StudentClass from '../views/student/StudentClass';
import StudentAssessments from '../views/student/StudentAssessments';
import StudentAssessment from '../views/student/StudentAssessment';
import StudentAttendance from '../views/student/StudentAttendance';
import StudentGrades from '../views/student/StudentGrades';
import StudentRewards from '../views/student/StudentRewards';
import AdminHome from '../views/admin/AdminHome';
import AdminStudents from '../views/admin/AdminStudents';
import AdminStudent from '../views/admin/AdminStudent';
import AdminTeachers from '../views/admin/AdminTeachers';
import AdminTeacher from '../views/admin/AdminTeacher';
import AdminClasses from '../views/admin/AdminClasses';
import AdminClass from '../views/admin/AdminClass';
import TeacherHome from '../views/teacher/TeacherHome';
import TeacherClass from '../views/teacher/TeacherClass';
import TeacherAssessments from '../views/teacher/TeacherAssessments';
import TeacherAssessment from '../views/teacher/TeacherAssessment';
import TeacherAttendance from '../views/teacher/TeacherAttendance';
import TeacherGrades from '../views/teacher/TeacherGrades';
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
        path: '/student-assessment/:classId/:id',
        name: 'student-assessment',
        component: StudentAssessment,
        props: true,
        meta: {
            requiresAuth: true,
            role: 'student',
        },
    },
    {
        path: '/student-attendance',
        name: 'student-attendance',
        component: StudentAttendance,
        meta: {
            requiresAuth: true,
            role: 'student',
        },
    },
    {
        path: '/student-grades',
        name: 'student-grades',
        component: StudentGrades,
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
        path: '/admin-students',
        name: 'admin-students',
        component: AdminStudents,
        meta: {
            requiresAuth: true,
            role: 'admin',
        },
    },
    {
        path: '/admin-student/:id',
        name: 'admin-student',
        component: AdminStudent,
        props: true,
        meta: {
            requiresAuth: true,
            role: 'admin',
        },
    },
    {
        path: '/admin-teachers',
        name: 'admin-teachers',
        component: AdminTeachers,
        meta: {
            requiresAuth: true,
            role: 'admin',
        },
    },
    {
        path: '/admin-teacher/:id',
        name: 'admin-teacher',
        component: AdminTeacher,
        props: true,
        meta: {
            requiresAuth: true,
            role: 'admin',
        },
    },
    {
        path: '/admin-classes',
        name: 'admin-classes',
        component: AdminClasses,
        meta: {
            requiresAuth: true,
            role: 'admin',
        },
    },
    {
        path: '/admin-class/:id',
        name: 'admin-class',
        component: AdminClass,
        props: true,
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
        path: '/teacher-class/:id',
        name: 'teacher-class',
        component: TeacherClass,
        props: true,
        meta: {
            requiresAuth: true,
            role: 'teacher',
        },
    },
    {
        path: '/teacher-assessments/:id/:type',
        name: 'teacher-assessments',
        component: TeacherAssessments,
        props: true,
        meta: {
            requiresAuth: true,
            role: 'teacher',
        },
    },
    {
        path: '/teacher-assessment/:classId/:id',
        name: 'teacher-assessment',
        component: TeacherAssessment,
        props: true,
        meta: {
            requiresAuth: true,
            role: 'teacher',
        },
    },
    {
        path: '/teacher-attendance',
        name: 'teacher-attendance',
        component: TeacherAttendance,
        meta: {
            requiresAuth: true,
            role: 'teacher',
        },
    },
    {
        path: '/teacher-grades',
        name: 'teacher-grades',
        component: TeacherGrades,
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
