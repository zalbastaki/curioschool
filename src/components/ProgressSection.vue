<template>
    <section class="progress" :class="$mq">
        <div class="level">
            <progress-bar :progress="progress" />
            <base-text type="p">Level {{ level }}</base-text>
        </div>
        <div class="coins">
            <fa-icon class="icon" :icon="['fas', 'coins']" aria-label="coins" />
            <base-text type="p">{{ profile.coins }} coins</base-text>
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

        .p {
            font-weight: bold;
            font-size: 25px;
            color: $dark-purple;

            &.tablet {
                font-size: 18px;
            }
        }

        .level {
            display: flex;
            align-items: center;
            margin-right: 30px;

            .p {
                margin-left: 8px;
            }
        }

        .coins {
            display: flex;
            align-items: center;

            .icon {
                color: $yellow;
                font-size: 25px;
                margin-right: 8px;
            }
        }
    }
</style>
