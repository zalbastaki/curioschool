<template>
    <component
        :is="to ? 'router-link' : 'div'"
        :to="to"
        class="card"
        :class="[color]"
        :style="{ background: background, border: `2px solid ${border}` }"
    >
        <slot />
    </component>
</template>

<script>
    export default {
        name: 'base-card',

        props: {
            color: {
                type: String,
                required: false,
                default() {
                    return 'yellow';
                },
            },

            background: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            border: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            to: {
                type: Object || String,
                required: false,
                default() {
                    return null;
                },
            },
        },
    };
</script>

<style lang="scss" scoped>
    .card {
        border-radius: $border-radius;
        padding: 20px;
        color: $black;
        text-decoration: none;

        &.dark-purple {
            background: $dark-purple;
            color: $white;
        }

        &.purple {
            background: $purple;
            color: $white;
        }

        &.yellow {
            background: $yellow;
        }

        &.orange {
            background: $orange;
            color: $white;
        }

        &.dark-orange {
            background: $dark-orange;
            color: $white;
        }
    }
</style>
