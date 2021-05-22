<template>
    <div class="dashboard" :class="[$mq, color]">
        <dashboard-sidebar
            :color="color"
            :button-color="btnColor"
            :text-color="textColor"
        />
        <div class="page-content">
            <slot />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import DashboardSidebar from './DashboardSidebar';

    export default {
        name: 'base-dashboard',

        components: {
            DashboardSidebar,
        },

        props: {
            color: {
                type: String,
                required: false,
                default() {
                    return 'purple';
                },
            },
        },

        computed: {
            ...mapGetters(['role']),

            btnColor() {
                if (this.color === 'purple' || this.color === 'dark-purple') {
                    return 'dark-orange';
                }

                return 'purple';
            },

            textColor() {
                if (this.color === 'yellow') {
                    return 'black';
                }

                return 'white';
            },
        },
    };
</script>

<style lang="scss" scoped>
    .dashboard {
        display: flex;
        width: 100vw;
        height: 100vh;
        max-width: 1950px;
        max-height: 100vh;
        margin: 0 auto;

        &.dark-purple {
            background: $dark-purple;
            border-right: 3px solid $dark-purple;
        }

        &.purple {
            background: $purple;
            border-right: 3px solid $purple;
        }

        &.yellow {
            background: $yellow;
            border-right: 3px solid $yellow;
        }

        &.orange {
            background: $orange;
            border-right: 3px solid $orange;
        }

        &.dark-orange {
            background: $dark-orange;
            border-right: 3px solid $dark-orange;
        }

        .page-content {
            flex: 1;
            background: $white;
            margin-top: 80px;
            padding: 30px;
            border-top-left-radius: 50px;
            overflow: scroll;
        }

        &.tablet {
            .page-content {
                margin-top: 40px;
            }
        }
    }
</style>
