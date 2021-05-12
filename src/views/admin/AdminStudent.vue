<template>
    <base-dashboard color="yellow">
        <base-loader :show="!currentAdminStudent" />
        <div v-if="currentAdminStudent" class="admin-student">
            <router-link class="back-btn" :to="`/admin-students`">
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </router-link>
            <base-text type="h3"
                >{{ currentAdminStudent.profile.first_name }}
                {{ currentAdminStudent.profile.last_name }}</base-text
            >
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'admin-student',

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        computed: {
            ...mapGetters(['currentAdminStudent', 'adminStudents']),
        },

        mounted() {
            this.updateCurrentAdminStudent();
        },

        methods: {
            ...mapActions(['updateCurrentAdminStudent']),
        },
    };
</script>

<style lang="scss" scoped>
    .admin-student {
        .back-btn {
            color: $black;
            font-size: 30px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid $orange;
            background: lighten($orange, 25%);
            margin-bottom: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            &:hover {
                margin-left: -3px;
            }
        }

        .h3 {
            text-transform: capitalize;
        }
    }
</style>
