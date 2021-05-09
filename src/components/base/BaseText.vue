<template>
    <component :is="type" class="text" :class="[type, $mq]">
        <slot />
    </component>
</template>

<script>
    export default {
        name: 'base-text',

        props: {
            type: {
                type: String,
                required: false,
                default() {
                    return 'p';
                },
            },
        },
    };
</script>

<style lang="scss" scoped>
    .text {
        margin: 0;
    }

    .h1 {
        color: $dark-purple;
        font-size: 100px;
        font-weight: bold;

        &.tablet {
            font-size: 70px;
        }
    }

    .h2 {
        font-size: 50px;

        &.tablet {
            font-size: 40px;
        }
    }

    .h3 {
        font-size: 35px;

        &.tablet {
            font-size: 30px;
        }
    }

    .h4 {
        font-size: 25px;

        &.tablet {
            font-size: 20px;
        }
    }

    .h5 {
        font-size: 20px;

        &.tablet {
            font-size: 18px;
        }
    }

    .p {
        font-size: 20px;
        line-height: 1.5;

        &.tablet {
            font-size: 14px;
        }
    }
</style>
