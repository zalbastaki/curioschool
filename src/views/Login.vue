<template>
    <div class="login">
        <form @submit.prevent="userLogin">
            <input type="email" name="email" id="email" v-model="user.email" />
            <input
                type="password"
                name="password"
                id="password"
                v-model="user.password"
            />
            <button type="submit">Go!</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'login',

        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
            };
        },

        methods: {
            ...mapActions(['login']),

            userLogin() {
                this.login(this.user);
            },
        },
    };
</script>
