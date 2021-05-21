<template>
    <base-dashboard color="orange">
        <base-loader :show="!currentAssessment" />
        <div v-if="currentAssessment" class="teacher-assessment">
            <a
                class="back-btn"
                @click="$router.go(-1)"
                :style="{
                    background: `${currentAssessment.class.color}44`,
                    borderColor: currentAssessment.class.color,
                }"
            >
                <fa-icon :icon="['fas', 'arrow-left']" aria-label="back" />
            </a>
            <base-text class="title" type="h3">
                {{ currentAssessment.type }}:
                {{ ' ' + currentAssessment.name }}
            </base-text>
            <!-- TO DO -->
            <base-text type="p">This is the teacher assessment page</base-text>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'teacher-assessment',

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

<style lang="scss" scoped>
    .teacher-assessment {
        .back-btn {
            color: $black;
            font-size: 30px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border-width: 3px;
            border-style: solid;
            margin-bottom: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
                margin-left: -3px;
            }
        }

        .title {
            text-transform: capitalize;
            margin: 15px 0 15px;
        }
    }
</style>
