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
        color: $black;
        margin: 0;
    }

    .h1 {
        color: $dark-purple;
        font-size: 100px;
        font-weight: bold;
    }

    .h2 {
        font-size: 50px;
    }

    .h3 {
        font-size: 35px;
    }

    .h4 {
        font-size: 25px;
    }

    .p {
        font-size: 20px;
        line-height: 1.5;
    }
</style>
