<template>
    <section class="progress">
        <div class="level">
            <progress-bar :progress="progress" />
            <base-text type="p">Level {{ level }}</base-text>
        </div>
        <div class="coins">
            <fa-icon class="icon" :icon="['fas', 'coins']" aria-label="coins" />
            {{ profile.coins }} coins
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProgressBar from './ProgressBar';

    export default {
        name: 'progress-section',

        components: {
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
</style>
