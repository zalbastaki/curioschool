<template>
    <div class="login">
        <div class="center-container">
            <div class="heading">
                <base-text type="h1">
                    {{ forgotPassword ? 'No worries!' : 'Welcome!' }}
                </base-text>
                <base-text v-if="forgotPassword" type="p"
                    >We'll send you an email to help you reset your
                    password.</base-text
                >
            </div>
            <form class="login-form" @submit.prevent="submit">
                <base-input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    v-model="user.email"
                />
                <base-input
                    v-if="!forgotPassword"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    v-model="user.password"
                />
                <base-button type="button" button-type="submit" color="orange">
                    {{ forgotPassword ? 'Send' : 'Go!' }}
                </base-button>
            </form>
        </div>

        <a class="forgotPassword" @click="forgotPassword = !forgotPassword">
            <base-text type="p">
                <span v-if="!forgotPassword"
                    >Did you forget your password?
                </span>
                <span v-else>Did you remember your password? </span>
                <span class="underline">Click here</span>
            </base-text>
        </a>

        <base-modal ref="error" heading="Oops!" />
        <base-modal ref="success" heading="Woohoo!" button-color="yellow" />
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import BaseText from '../components/base/BaseText.vue';

    export default {
        components: { BaseText },
        name: 'login',

        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                forgotPassword: false,
            };
        },

        computed: {
            disabled() {
                return !this.user.email || !this.user.password;
            },
        },

        methods: {
            ...mapActions(['login', 'sendPasswordResetEmail']),

            userLogin() {
                this.login(this.user)
                    .then(() => {
                        // TO DO
                    })
                    .catch(e => {
                        this.handleError(e);
                    });
            },

            userForgotPassword() {
                this.sendPasswordResetEmail(this.user.email)
                    .then(() => {
                        this.$refs.success.openModal(
                            'Check your email! Click the link in the email we just sent you to reset your password.'
                        );
                    })
                    .catch(e => {
                        this.handleError(e);
                    });
            },

            handleError(e) {
                let errMessage = e.message;
                if (e.code === 'auth/invalid-email') {
                    errMessage =
                        'It looks like the email you entered is incorrect. Please try again or ask an adult for help.';
                } else if (e.code === 'auth/wrong-password') {
                    errMessage =
                        'It looks like the password you enterd is incorrect. Please try again or ask an adult for help. If you forgot your password, click the link at the bottom of the page.';
                }
                this.$refs.error.openModal(errMessage);
            },

            submit() {
                if (this.forgotPassword) {
                    return this.userForgotPassword();
                }

                return this.userLogin();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        width: 100vw;
        height: 100vh;

        .center-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .heading {
            margin-bottom: 30px;

            .h1 {
                text-transform: uppercase;
            }
        }

        .login-form {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .input {
                width: 80vw;
                max-width: 500px;
                margin-top: 10px;
            }

            .button {
                margin-top: 30px;
            }
        }

        .forgotPassword {
            cursor: pointer;
            margin-bottom: 50px;

            .underline {
                text-decoration: underline;
            }

            &:hover {
                font-weight: bold;
            }
        }
    }
</style>
