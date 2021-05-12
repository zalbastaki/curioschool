<template>
    <base-dashboard color="yellow">
        <base-loader :show="!profile" />
        <div v-if="profile" class="admin-home">
            <base-text class="greeting" type="h1"
                >Hello {{ profile.first_name }}.</base-text
            >
            <base-text type="h3">What would you like to do?</base-text>
            <base-button type="router-link" to="/admin-students" width="500px">
                View or Add Students
            </base-button>
            <base-button
                type="router-link"
                to="/admin-teachers"
                color="orange"
                width="500px"
            >
                View or Add Teachers
            </base-button>
            <base-button
                type="router-link"
                to="/admin-classes"
                color="dark-orange"
                width="500px"
            >
                View or Add Classes
            </base-button>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'admin-home',

        computed: {
            ...mapGetters(['profile']),
        },

        methods: {
            ...mapActions(['logout']),
        },
    };
</script>

<style lang="scss" scoped>
    .admin-home {
        .greeting {
            margin-bottom: 40px;
        }

        .button {
            margin-top: 20px;
        }
    }
</style>
