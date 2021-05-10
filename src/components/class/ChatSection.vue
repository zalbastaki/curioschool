<template>
    <base-section
        class="chat"
        heading="chat"
        :background="`${color}44`"
        :border="color"
    >
        <!-- TO DO -->
    </base-section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'chat-section',

        computed: {
            ...mapGetters(['currentClass']),

            color() {
                return this.currentClass.color;
            },
        },
    };
</script>
