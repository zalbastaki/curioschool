<template>
    <section class="base-section" :class="background || border ? '' : color">
        <div
            class="heading"
            :style="{ background: background, borderColor: border }"
        >
            <base-text type="h3">{{ heading }}</base-text>
        </div>
        <div class="content" :style="{ borderColor: border }">
            <slot />
        </div>
    </section>
</template>

<script>
    export default {
        name: 'base-section',

        props: {
            heading: {
                type: String,
                required: true,
            },

            color: {
                type: String,
                required: false,
                default() {
                    return 'orange';
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
        },
    };
</script>

<style lang="scss" scoped>
    section.base-section {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: min-content 1fr;

        .heading {
            text-transform: capitalize;
            border-top-right-radius: $border-radius;
            border-top-left-radius: $border-radius;
            padding: 10px 15px;
            border-top-width: 3px;
            border-right-width: 3px;
            border-left-width: 3px;
            border-top-style: solid;
            border-right-style: solid;
            border-left-style: solid;
        }

        .content {
            border-bottom-right-radius: $border-radius;
            border-bottom-left-radius: $border-radius;
            padding: 10px 15px;
            overflow: scroll;
            border-width: 3px;
            border-style: solid;
        }

        &.dark-purple {
            .heading {
                background: $dark-purple;
                color: $white;
            }

            .content {
                border: 3px solid $dark-purple;
            }
        }

        &.purple {
            .heading {
                background: $purple;
                color: $white;
            }

            .content {
                border: 3px solid $purple;
            }
        }

        &.yellow {
            .heading {
                background: $yellow;
                color: $black;
            }

            .content {
                border: 3px solid $yellow;
            }
        }

        &.orange {
            .heading {
                background: $orange;
                color: $white;
            }

            .content {
                border: 3px solid $orange;
            }
        }

        &.dark-orange {
            .heading {
                background: $dark-orange;
                color: $white;
            }

            .content {
                border: 3px solid $dark-orange;
            }
        }
    }
</style>
