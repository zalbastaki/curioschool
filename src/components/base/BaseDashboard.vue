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

        &.dark-purple {
            background: $dark-purple;
        }

        &.purple {
            background: $purple;
        }

        &.yellow {
            background: $yellow;
        }

        &.orange {
            background: $orange;
        }

        &.dark-orange {
            background: $dark-orange;
        }

        .page-content {
            flex: 1;
            background: $white;
            margin-top: 80px;
            padding: 30px;
            border-top-left-radius: 50px;
        }

        &.tablet {
            .page-content {
                margin-top: 40px;
            }
        }
    }
</style>
