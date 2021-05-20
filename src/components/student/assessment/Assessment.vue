<template>
    <div class="assessment">
        <base-text type="p">This is the assessment.</base-text>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'assessment',

        computed: {
            ...mapGetters(['currentAssessment']),
        },

        created() {
            this.updateCurrentAssessment();
        },

        methods: {
            ...mapActions(['updateCurrentAssessment']),
        },
    };
</script>

<style lang="scss" scoped></style>
