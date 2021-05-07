<template>
    <dashboard>
        <div class="student-home">
            <section class="progress">
                <div class="level">
                    <progress-bar :progress="progress" />
                    <base-text type="p">Level {{ level }}</base-text>
                </div>
                <div class="coins">
                    <fa-icon
                        class="icon"
                        :icon="['fas', 'coins']"
                        aria-label="coins"
                    />
                    {{ profile.coins }} coins
                </div>
            </section>
            <section class="greeting">
                <base-text type="h1">Hey {{ profile.first_name }}!</base-text>
            </section>
        </div>
    </dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Dashboard from '../../components/Dashboard';
    import ProgressBar from '../../components/ProgressBar';

    export default {
        name: 'student-home',

        components: {
            Dashboard,
            ProgressBar,
        },

        computed: {
            ...mapGetters(['profile']),

            progress() {
                return (
                    this.profile.points -
                    Math.floor(this.profile.points / 100) * 100
                );
            },

            level() {
                return Math.floor(this.profile.points / 100);
            },
        },
    };
</script>

<style lang="scss" scoped>
    section.progress {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 25px;
        color: $dark-purple;
        font-weight: bold;

        .level {
            display: flex;
            align-items: center;
            margin-right: 30px;

            .p {
                font-size: 25px;
                color: $dark-purple;
                margin-left: 10px;
            }
        }

        .coins {
            display: flex;
            align-items: center;

            .icon {
                color: $yellow;
                margin-right: 8px;
            }
        }
    }

    section.greeting {
        .h1 {
            font-size: 70px;
        }
    }
</style>
