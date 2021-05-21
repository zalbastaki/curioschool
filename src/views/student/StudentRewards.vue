<template>
    <base-dashboard>
        <base-loader :show="!profile" />
        <div v-if="profile" class="student-rewards">
            <section class="top-bar">
                <base-text type="h1">Rewards</base-text>
                <progress-section />
            </section>
            <base-text v-if="profile.rewards.length === 0" type="p">
                You don't have any rewards in your inventory!
            </base-text>
            <section class="rewards">
                <div
                    v-for="(reward, index) in profile.rewards"
                    :key="index"
                    class="reward"
                    :style="{
                        background: `${reward.class.color}44`,
                        borderColor: reward.class.color,
                    }"
                >
                    <base-text type="p">{{ reward.label }}</base-text>
                    <div class="class">Class: {{ reward.class.name }}</div>
                </div>
            </section>
        </div>
    </base-dashboard>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProgressSection from '../../components/student/ProgressSection';

    export default {
        name: 'student-rewards',

        components: {
            ProgressSection,
        },

        computed: {
            ...mapGetters(['profile']),
        },
    };
</script>

<style lang="scss" scoped>
    .student-rewards {
        .top-bar {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .h1 {
                font-size: 50px;
            }
        }

        .rewards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;

            .reward {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border-width: 3px;
                border-style: solid;
                border-radius: $border-radius;
                padding: 10px 15px;

                .class {
                    align-self: flex-end;
                    margin-top: 15px;
                    text-transform: capitalize;
                    font-size: 14px;
                }
            }
        }
    }
</style>
