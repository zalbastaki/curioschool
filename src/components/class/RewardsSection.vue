<template>
    <base-section
        class="rewards"
        heading="rewards"
        :background="`${color}44`"
        :border="color"
    >
        <!-- TO DO -->
    </base-section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'rewards-section',

        computed: {
            ...mapGetters(['currentClass']),

            color() {
                return this.currentClass.color;
            },
        },
    };
</script>
