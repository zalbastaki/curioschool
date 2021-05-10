<template>
    <base-section
        class="leaderboard"
        heading="leaderboard"
        :background="`${color}44`"
        :border="color"
    >
        <!-- TO DO -->
    </base-section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'leaderboard-section',

        computed: {
            ...mapGetters(['currentClass']),

            color() {
                return this.currentClass.color;
            },
        },
    };
</script>
