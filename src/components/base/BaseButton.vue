<template>
    <component
        :is="type"
        :type="buttonType"
        :to="to"
        :href="href"
        :target="target"
        :rel="rel"
        :disabled="disabled"
        class="button"
        :class="[color, disabled ? 'disabled' : '']"
        :style="{
            width,
            height,
        }"
        @click="$emit('click')"
    >
        <slot />
    </component>
</template>

<script>
    export default {
        name: 'base-button',

        props: {
            type: {
                type: String,
                required: true,
            },

            buttonType: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            to: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            href: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            rel: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            target: {
                type: String,
                required: false,
                default() {
                    return null;
                },
            },

            disabled: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                },
            },

            color: {
                type: String,
                required: false,
                default() {
                    return 'purple';
                },
            },

            width: {
                type: String,
                required: false,
                default() {
                    return '228px';
                },
            },

            height: {
                type: String,
                required: false,
                default() {
                    return '57px';
                },
            },
        },
    };
</script>

<style lang="scss" scoped>
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bold;
        text-transform: uppercase;
        color: $white;
        border: 0;
        border-radius: $border-radius;
        text-decoration: none;
        cursor: pointer;

        &.dark-purple {
            background: $dark-purple;
            box-shadow: 3px 3px darken($dark-purple, 10%);

            &:hover {
                background: darken($dark-purple, 5%);
            }

            &:focus {
                outline: 3px solid rgba($dark-purple, 0.3);
            }

            &.disabled {
                background: rgba($dark-purple, 0.3);
                box-shadow: 3px 3px rgba($dark-purple, 0.5);
            }
        }

        &.purple {
            background: $purple;
            box-shadow: 3px 3px darken($purple, 10%);

            &:hover {
                background: darken($purple, 5%);
            }

            &:focus {
                outline: 3px solid rgba($purple, 0.3);
            }

            &.disabled {
                background: rgba($purple, 0.3);
                box-shadow: 3px 3px rgba($purple, 0.5);
            }
        }

        &.yellow {
            background: $yellow;
            box-shadow: 3px 3px darken($yellow, 10%);
            color: $black;

            &:hover {
                background: darken($yellow, 5%);
            }

            &:focus {
                outline: 3px solid rgba($yellow, 0.3);
            }

            &.disabled {
                background: rgba($yellow, 0.3);
                box-shadow: 3px 3px rgba($yellow, 0.5);
            }
        }

        &.orange {
            background: $orange;
            box-shadow: 3px 3px darken($orange, 10%);

            &:hover {
                background: darken($orange, 5%);
            }

            &:focus {
                outline: 3px solid rgba($orange, 0.3);
            }

            &.disabled {
                background: rgba($orange, 0.3);
                box-shadow: 3px 3px rgba($orange, 0.5);
            }
        }

        &.dark-orange {
            background: $dark-orange;
            box-shadow: 3px 3px darken($dark-orange, 10%);

            &:hover {
                background: darken($dark-orange, 5%);
            }

            &:focus {
                outline: 3px solid rgba($dark-orange, 0.3);
            }

            &.disabled {
                background: rgba($dark-orange, 0.3);
                box-shadow: 3px 3px rgba($dark-orange, 0.5);
            }
        }

        &.disabled {
            pointer-events: none;
        }
    }
</style>
