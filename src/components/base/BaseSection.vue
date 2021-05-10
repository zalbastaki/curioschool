<template>
    <section class="base-section" :class="color">
        <div class="heading">
            <base-text type="h3">{{ heading }}</base-text>
        </div>
        <div class="content">
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
            color: $white;
            text-transform: capitalize;
            border-top-right-radius: $border-radius;
            border-top-left-radius: $border-radius;
            padding: 10px 20px;
        }

        .content {
            border-bottom-right-radius: $border-radius;
            border-bottom-left-radius: $border-radius;
            padding: 10px 20px;
            overflow: scroll;
        }

        &.dark-purple {
            .heading {
                background: $dark-purple;
            }

            .content {
                border: 3px solid $dark-purple;
            }
        }

        &.purple {
            .heading {
                background: $purple;
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
            }

            .content {
                border: 3px solid $orange;
            }
        }

        &.dark-orange {
            .heading {
                background: $dark-orange;
            }

            .content {
                border: 3px solid $dark-orange;
            }
        }
    }
</style>
